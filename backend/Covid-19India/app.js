const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dbPath = path.join(__dirname, 'covid19IndiaPortal.db')
const app = express()
const PORT = process.env.PORT || 3000
const configuredOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

const setCorsHeaders = (request, response) => {
  const requestOrigin = (request.headers.origin || '').replace(/\/$/, '')
  const allowAllOrigins =
    configuredOrigins.length === 0 || configuredOrigins.includes('*')
  const isOriginAllowed =
    allowAllOrigins ||
    (requestOrigin !== '' && configuredOrigins.includes(requestOrigin))

  if (allowAllOrigins) {
    response.header('Access-Control-Allow-Origin', '*')
  } else if (isOriginAllowed) {
    response.header('Access-Control-Allow-Origin', requestOrigin)
    response.header('Vary', 'Origin')
  }

  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  response.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  )
}

app.use((request, response, next) => {
  setCorsHeaders(request, response)

  if (request.method === 'OPTIONS') {
    response.status(204).send()
    return
  }

  next()
})

app.use(express.json())

app.get('/health', (request, response) => {
  response.send({status: 'ok'})
})

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`)
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(-1)
  }
}
initializeDBAndServer()

const convertStateDbObjectToResponseObject = dbObject => {
  return {
    stateId: dbObject.state_id,
    stateName: dbObject.state_name,
    population: dbObject.population,
  }
}

const convertDistrictDbObjectToResponseObject = dbObject => {
  return {
    districtId: dbObject.district_id,
    districtName: dbObject.district_name,
    stateId: dbObject.state_id,
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
  response.send(stateArray.map(each => convertStateDbObjectToResponseObject(each)))
})
//states
app.get('/states', authentication, async (request, response) => {
  const dbQuery = `SELECT * FROM state;`
  const dbResponse = await db.all(dbQuery)
  response.send(dbResponse.map(each => convertStateDbObjectToResponseObject(each)))
})

//states/:stateId
app.get('/states/:stateId', authentication, async (request, response) => {
  const {stateId} = request.params
  const dbQuery = `SELECT * FROM state WHERE state_id=${stateId};`
  const dbResponse = await db.get(dbQuery)
  if (dbResponse === undefined) {
    response.status(404).send('State Not Found')
    return
  }
  response.send(convertStateDbObjectToResponseObject(dbResponse))
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
    if (dbResponse === undefined) {
      response.status(404).send('District Not Found')
      return
    }
    response.send(convertDistrictDbObjectToResponseObject(dbResponse))
  },
)

//delete
app.delete(
  '/districts/:districtId/',
  authentication,
  async (request, response) => {
    const {districtId} = request.params
    const dbQuery = `DELETE FROM district WHERE district_id=${districtId};`
    const dbResponse = await db.run(dbQuery)
    if (dbResponse.changes === 0) {
      response.status(404).send('District Not Found')
      return
    }
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
    if (dbResponse.changes === 0) {
      response.status(404).send('District Not Found')
      return
    }
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
    response.send({
      totalCases: dbResponse.totalCases ?? 0,
      totalCured: dbResponse.totalCured ?? 0,
      totalActive: dbResponse.totalActive ?? 0,
      totalDeaths: dbResponse.totalDeaths ?? 0,
    })
  },
)

module.exports = app
