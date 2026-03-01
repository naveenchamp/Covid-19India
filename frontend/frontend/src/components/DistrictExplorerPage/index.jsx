import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  clearStoredToken,
  deleteDistrict,
  getDistrictById,
  updateDistrict,
} from '../../api'
import {
  ButtonRow,
  DeleteButton,
  DistrictField,
  DistrictFieldLabel,
  DistrictForm,
  DistrictFormPanel,
  DistrictInput,
  ExplorerStatus,
  Eyebrow,
  Header,
  PageContainer,
  SearchButton,
  SearchField,
  SearchFieldLabel,
  SearchInput,
  SearchPanel,
  Subtitle,
  Title,
  UpdateButton,
} from './styledComponents'

const EMPTY_FORM = {
  districtName: '',
  stateId: '',
  cases: '',
  cured: '',
  active: '',
  deaths: '',
}

const toNumber = value => (value === '' ? 0 : Number(value))

function DistrictExplorerPage() {
  const navigate = useNavigate()
  const [districtIdInput, setDistrictIdInput] = useState('')
  const [districtForm, setDistrictForm] = useState(EMPTY_FORM)
  const [selectedDistrictId, setSelectedDistrictId] = useState(null)
  const [message, setMessage] = useState('Search a district ID to load details.')
  const [isError, setIsError] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const handleAuthError = error => {
    if (error.message === 'Invalid JWT Token') {
      clearStoredToken()
      navigate('/login', {replace: true})
      return true
    }
    return false
  }

  const loadDistrict = async event => {
    event.preventDefault()
    const districtId = districtIdInput.trim()

    if (!districtId) {
      setMessage('Enter a district ID first.')
      setIsError(true)
      return
    }

    setIsBusy(true)
    setIsError(false)
    setMessage('Loading district...')

    try {
      const response = await getDistrictById(districtId)
      setSelectedDistrictId(response.districtId)
      setDistrictForm({
        districtName: response.districtName,
        stateId: String(response.stateId),
        cases: String(response.cases),
        cured: String(response.cured),
        active: String(response.active),
        deaths: String(response.deaths),
      })
      setMessage('District loaded. Update fields and save.')
    } catch (error) {
      if (handleAuthError(error)) {
        return
      }
      setSelectedDistrictId(null)
      setDistrictForm(EMPTY_FORM)
      setMessage(error.message)
      setIsError(true)
    } finally {
      setIsBusy(false)
    }
  }

  const onChangeField = event => {
    const {name, value} = event.target
    setDistrictForm(previous => ({...previous, [name]: value}))
  }

  const saveDistrict = async event => {
    event.preventDefault()
    if (!selectedDistrictId) {
      setMessage('Load a district first.')
      setIsError(true)
      return
    }

    setIsBusy(true)
    setIsError(false)
    setMessage('')

    try {
      await updateDistrict(selectedDistrictId, {
        districtName: districtForm.districtName.trim(),
        stateId: toNumber(districtForm.stateId),
        cases: toNumber(districtForm.cases),
        cured: toNumber(districtForm.cured),
        active: toNumber(districtForm.active),
        deaths: toNumber(districtForm.deaths),
      })
      setMessage('District Details Updated')
    } catch (error) {
      if (handleAuthError(error)) {
        return
      }
      setMessage(error.message)
      setIsError(true)
    } finally {
      setIsBusy(false)
    }
  }

  const removeDistrict = async () => {
    if (!selectedDistrictId) {
      setMessage('Load a district first.')
      setIsError(true)
      return
    }

    setIsBusy(true)
    setIsError(false)
    setMessage('')

    try {
      await deleteDistrict(selectedDistrictId)
      setMessage('District Removed')
      setSelectedDistrictId(null)
      setDistrictForm(EMPTY_FORM)
      setDistrictIdInput('')
    } catch (error) {
      if (handleAuthError(error)) {
        return
      }
      setMessage(error.message)
      setIsError(true)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <PageContainer>
      <Header>
        <div>
          <Eyebrow>District Management</Eyebrow>
          <Title>District Explorer</Title>
          <Subtitle>
            Retrieve, update, and remove district records through backend APIs.
          </Subtitle>
        </div>
      </Header>

      <SearchPanel onSubmit={loadDistrict}>
        <SearchField>
          <SearchFieldLabel>District ID</SearchFieldLabel>
          <SearchInput
            type="number"
            min="1"
            value={districtIdInput}
            onChange={event => setDistrictIdInput(event.target.value)}
            placeholder="Example: 12"
          />
        </SearchField>
        <SearchButton type="submit" disabled={isBusy}>
          {isBusy ? 'Working...' : 'Load District'}
        </SearchButton>
      </SearchPanel>

      <DistrictFormPanel>
        <DistrictForm onSubmit={saveDistrict}>
          <DistrictField>
            <DistrictFieldLabel>District Name</DistrictFieldLabel>
            <DistrictInput
              name="districtName"
              type="text"
              value={districtForm.districtName}
              onChange={onChangeField}
              disabled={!selectedDistrictId}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>State ID</DistrictFieldLabel>
            <DistrictInput
              name="stateId"
              type="number"
              min="1"
              value={districtForm.stateId}
              onChange={onChangeField}
              disabled={!selectedDistrictId}
              required
            />
          </DistrictField>

          <DistrictField>
            <DistrictFieldLabel>Cases</DistrictFieldLabel>
            <DistrictInput
              name="cases"
              type="number"
              min="0"
              value={districtForm.cases}
              onChange={onChangeField}
              disabled={!selectedDistrictId}
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
              disabled={!selectedDistrictId}
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
              disabled={!selectedDistrictId}
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
              disabled={!selectedDistrictId}
              required
            />
          </DistrictField>

          <ButtonRow>
            <UpdateButton type="submit" disabled={isBusy}>
              {isBusy ? 'Working...' : 'Update District'}
            </UpdateButton>
            <DeleteButton
              type="button"
              onClick={removeDistrict}
              disabled={!selectedDistrictId || isBusy}
            >
              Delete District
            </DeleteButton>
          </ButtonRow>
        </DistrictForm>
      </DistrictFormPanel>

      {message ? (
        <ExplorerStatus $variant={isError ? 'error' : 'neutral'}>
          {message}
        </ExplorerStatus>
      ) : null}
    </PageContainer>
  )
}

export default DistrictExplorerPage
