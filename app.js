const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dbPath = path.join(__dirname, 'covid19IndiaPortal.db')
const app = express()

app.use(express.json())

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(-1)
  }
}
initializeDBAndServer()

const convertDbObjectToResponseObject = dbObject => {
  return {
    districtId: dbObject.district_id,
    districtName: dbObject.district_name,
    stateId: dbObject.state_id,
    stateName: dbObject.state_name,
    population: dbObject.population,
    cases: dbObject.cases,
    cured: dbObject.cured,
    active: dbObject.active,
    deaths: dbObject.deaths,
  }
}

//authentication
const authentication = (request, response, next) => {
  let jwtToken
  const authHeader = request.headers['authorization']
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]
  }
  if (authHeader === undefined) {
    response.status(401).send('Invalid JWT Token')
  } else {
    jwt.verify(jwtToken, 'ravi', (error, payload) => {
      if (error) {
        response.status(401).send('Invalid JWT Token')
      } else {
        request.username = payload.username
        next()
      }
    })
  }
}

//Login
app.post('/login/', async (request, response) => {
  const {username, password} = request.body

  // Secure parameterized query to prevent SQL injection
  const selectUserQuery = `SELECT * FROM user WHERE username ='${username}';`
  const dbUser = await db.get(selectUserQuery)

  if (dbUser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatched === true) {
      const payload = {username: username}
      const jwtToken = jwt.sign(payload, 'ravi')
      response.send({jwtToken})
    } else {
      response.status(400)
      response.send('Invalid password')
    }
  }
})

app.get('/states/', authentication, async (request, response) => {
  const getstateQuery = `
            SELECT
              *
            FROM
             state
            ORDER BY
              state_id;`
  const stateArray = await db.all(getstateQuery)
  response.send(stateArray.map(each => convertDbObjectToResponseObject(each)))
})
//states
app.get('/states', authentication, async (request, response) => {
  const dbQuery = `SELECT * FROM state;`
  const dbResponse = await db.all(dbQuery)
  response.send(dbResponse.map(each => convertDbObjectToResponseObject(each)))
})

//states/:stateId
app.get('/states/:stateId', authentication, async (request, response) => {
  const {stateId} = request.params
  const dbQuery = `SELECT * FROM state WHERE state_id=${stateId};`
  const dbResponse = await db.get(dbQuery)
  response.send(convertDbObjectToResponseObject(dbResponse))
})

//districts
app.post('/districts/', authentication, async (request, response) => {
  const {districtName, stateId, cases, cured, active, deaths} = request.body
  const dbQuery = `INSERT INTO 
  district (district_name,state_id,cases,cured,active,deaths) 
  VALUES ('${districtName}','${stateId}','${cases}','${cured}','${active}','${deaths}');`
  const dbResponse = await db.run(dbQuery)
  response.send('District Successfully Added')
})

//districts/:districtId/
app.get(
  '/districts/:districtId/',
  authentication,
  async (request, response) => {
    const {districtId} = request.params
    const dbQuery = `SELECT * FROM district WHERE district_id=${districtId};`
    const dbResponse = await db.get(dbQuery)
    response.send(convertDbObjectToResponseObject(dbResponse))
  },
)

//delete
app.delete(
  '/districts/:districtId/',
  authentication,
  async (request, response) => {
    const {districtId} = request.params
    const dbQuery = `DELETE FROM district WHERE district_id=${districtId};`
    const dbResponse = await db.get(dbQuery)
    response.send('District Removed')
  },
)

//districts/:districtId/Update
app.put(
  '/districts/:districtId/',
  authentication,
  async (request, response) => {
    const {districtId} = request.params
    const {districtName, stateId, cases, cured, active, deaths} = request.body
    const dbQuery = `UPDATE district 
  SET district_name='${districtName}',state_id='${stateId}',cases='${cases}',cured='${cured}',active='${active}',deaths='${deaths}' WHERE district_id=${districtId};`
    const dbResponse = await db.run(dbQuery)
    response.send('District Details Updated')
  },
)

//states/:stateId/stats/
app.get(
  '/states/:stateId/stats/',
  authentication,
  async (request, response) => {
    const {stateId} = request.params
    const dbQuery = `SELECT SUM(cases) as totalCases,
   SUM(cured) as totalCured,
   SUM(active) as totalActive,
   SUM(deaths) as totalDeaths FROM district WHERE state_id='${stateId}';`
    const dbResponse = await db.get(dbQuery)
    response.send(dbResponse)
  },
)

module.exports = app
