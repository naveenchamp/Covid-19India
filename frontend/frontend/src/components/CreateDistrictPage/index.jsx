import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {clearStoredToken, createDistrict, getStates} from '../../api'
import {
  DistrictField,
  DistrictFieldLabel,
  DistrictForm,
  DistrictFormPanel,
  DistrictInput,
  DistrictSelect,
  Eyebrow,
  FormStatus,
  Header,
  PageContainer,
  SubmitButton,
  Subtitle,
  Title,
} from './styledComponents'

const initialDistrictForm = {
  districtName: '',
  stateId: '',
  cases: '',
  cured: '',
  active: '',
  deaths: '',
}

const toNumber = value => (value === '' ? 0 : Number(value))

function CreateDistrictPage() {
  const navigate = useNavigate()
  const [states, setStates] = useState([])
  const [districtForm, setDistrictForm] = useState(initialDistrictForm)
  const [message, setMessage] = useState('Loading states...')
  const [isError, setIsError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await getStates()
        setStates(response)
        setMessage('')

        if (response.length > 0) {
          setDistrictForm(previous => ({
            ...previous,
            stateId: String(response[0].stateId),
          }))
        }
      } catch (error) {
        if (error.message === 'Invalid JWT Token') {
          clearStoredToken()
          navigate('/login', {replace: true})
          return
        }
        setIsError(true)
        setMessage(error.message)
      }
    }

    loadStates()
  }, [navigate])

  const onChangeField = event => {
    const {name, value} = event.target
    setDistrictForm(previous => ({...previous, [name]: value}))
  }

  const onSubmit = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    try {
      await createDistrict({
        districtName: districtForm.districtName.trim(),
        stateId: toNumber(districtForm.stateId),
        cases: toNumber(districtForm.cases),
        cured: toNumber(districtForm.cured),
        active: toNumber(districtForm.active),
        deaths: toNumber(districtForm.deaths),
      })
      setDistrictForm(previous => ({
        ...initialDistrictForm,
        stateId: previous.stateId,
      }))
      setMessage('District Successfully Added')
    } catch (error) {
      if (error.message === 'Invalid JWT Token') {
        clearStoredToken()
        navigate('/login', {replace: true})
        return
      }
      setIsError(true)
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageContainer>
      <Header>
        <div>
          <Eyebrow>District Management</Eyebrow>
          <Title>Create New District</Title>
          <Subtitle>
            Add a district record directly into your existing backend database.
          </Subtitle>
        </div>
      </Header>

      <DistrictFormPanel>
        <DistrictForm onSubmit={onSubmit}>
          <DistrictField>
            <DistrictFieldLabel>District Name</DistrictFieldLabel>
            <DistrictInput
              name="districtName"
              type="text"
              value={districtForm.districtName}
              onChange={onChangeField}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>State</DistrictFieldLabel>
            <DistrictSelect
              name="stateId"
              value={districtForm.stateId}
              onChange={onChangeField}
              required
            >
              {states.map(state => (
                <option key={state.stateId} value={state.stateId}>
                  {state.stateName}
                </option>
              ))}
            </DistrictSelect>
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>Cases</DistrictFieldLabel>
            <DistrictInput
              name="cases"
              type="number"
              min="0"
              value={districtForm.cases}
              onChange={onChangeField}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>Cured</DistrictFieldLabel>
            <DistrictInput
              name="cured"
              type="number"
              min="0"
              value={districtForm.cured}
              onChange={onChangeField}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>Active</DistrictFieldLabel>
            <DistrictInput
              name="active"
              type="number"
              min="0"
              value={districtForm.active}
              onChange={onChangeField}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>Deaths</DistrictFieldLabel>
            <DistrictInput
              name="deaths"
              type="number"
              min="0"
              value={districtForm.deaths}
              onChange={onChangeField}
              required
            />
          </DistrictField>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save District'}
          </SubmitButton>
        </DistrictForm>
      </DistrictFormPanel>

      {message ? (
        <FormStatus $variant={isError ? 'error' : 'success'}>{message}</FormStatus>
      ) : null}
    </PageContainer>
  )
}

export default CreateDistrictPage
