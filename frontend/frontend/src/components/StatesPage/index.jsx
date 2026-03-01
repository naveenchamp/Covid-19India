import {useEffect, useMemo, useState} from 'react'
import {clearStoredToken, getStates} from '../../api'
import {
  EmptyStatus,
  Eyebrow,
  Header,
  PageContainer,
  PageStatus,
  PopulationLabel,
  PopulationValue,
  SearchField,
  SearchInput,
  SearchLabel,
  StateCard,
  StateName,
  StatesGrid,
  Subtitle,
  Title,
  ViewButton,
} from './styledComponents'
import {useNavigate} from 'react-router-dom'

function StatesPage() {
  const navigate = useNavigate()
  const [states, setStates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusMessage, setStatusMessage] = useState('Loading states...')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await getStates()
        setStates(response)
        setStatusMessage('')
      } catch (error) {
        if (error.message === 'Invalid JWT Token') {
          clearStoredToken()
          navigate('/login', {replace: true})
          return
        }
        setIsError(true)
        setStatusMessage(error.message)
      }
    }

    loadStates()
  }, [navigate])

  const filteredStates = useMemo(
    () =>
      states.filter(state =>
        state.stateName.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, states],
  )

  return (
    <PageContainer>
      <Header>
        <div>
          <Eyebrow>Dashboard</Eyebrow>
          <Title>States Snapshot</Title>
          <Subtitle>
            Search by state name and open a state to inspect cumulative stats.
          </Subtitle>
        </div>
        <SearchField>
          <SearchLabel>Search</SearchLabel>
          <SearchInput
            type="text"
            placeholder="Try Tamil Nadu"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </SearchField>
      </Header>

      {statusMessage ? (
        <PageStatus $variant={isError ? 'error' : 'neutral'}>{statusMessage}</PageStatus>
      ) : null}

      <StatesGrid>
        {filteredStates.map(state => (
          <StateCard key={state.stateId}>
            <StateName>{state.stateName}</StateName>
            <PopulationLabel>Population</PopulationLabel>
            <PopulationValue>{Number(state.population).toLocaleString()}</PopulationValue>
            <ViewButton to={`/states/${state.stateId}`}>View Stats</ViewButton>
          </StateCard>
        ))}
      </StatesGrid>

      {!statusMessage && filteredStates.length === 0 ? (
        <EmptyStatus>No states matched your search.</EmptyStatus>
      ) : null}
    </PageContainer>
  )
}

export default StatesPage
