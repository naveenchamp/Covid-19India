import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {clearStoredToken, getStateById, getStateStats} from '../../api'
import {
  BackButton,
  Eyebrow,
  Header,
  InfoStrip,
  PageContainer,
  PageStatus,
  PopulationLabel,
  PopulationValue,
  StatCard,
  StatLabel,
  StatsGrid,
  StatValue,
  Subtitle,
  Title,
} from './styledComponents'

const ZERO_STATS = {
  totalCases: 0,
  totalCured: 0,
  totalActive: 0,
  totalDeaths: 0,
}

function StateDetailsPage() {
  const {stateId} = useParams()
  const navigate = useNavigate()

  const [stateInfo, setStateInfo] = useState(null)
  const [stats, setStats] = useState(ZERO_STATS)
  const [statusMessage, setStatusMessage] = useState('Loading state details...')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loadStateDetails = async () => {
      setStatusMessage('Loading state details...')
      setIsError(false)

      try {
        const [stateResponse, statsResponse] = await Promise.all([
          getStateById(stateId),
          getStateStats(stateId),
        ])
        setStateInfo(stateResponse)
        setStats({...ZERO_STATS, ...statsResponse})
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

    loadStateDetails()
  }, [navigate, stateId])

  return (
    <PageContainer>
      <Header>
        <div>
          <Eyebrow>State View</Eyebrow>
          <Title>{stateInfo ? stateInfo.stateName : `State #${stateId}`}</Title>
          <Subtitle>Aggregated district totals for the selected state.</Subtitle>
        </div>
        <BackButton to="/">Back to States</BackButton>
      </Header>

      {statusMessage ? (
        <PageStatus $variant={isError ? 'error' : 'neutral'}>{statusMessage}</PageStatus>
      ) : null}

      {stateInfo ? (
        <>
          <InfoStrip>
            <PopulationLabel>Population</PopulationLabel>
            <PopulationValue>{Number(stateInfo.population).toLocaleString()}</PopulationValue>
          </InfoStrip>

          <StatsGrid>
            <StatCard $variant="cases">
              <StatLabel>Total Cases</StatLabel>
              <StatValue>{Number(stats.totalCases).toLocaleString()}</StatValue>
            </StatCard>
            <StatCard $variant="cured">
              <StatLabel>Total Cured</StatLabel>
              <StatValue>{Number(stats.totalCured).toLocaleString()}</StatValue>
            </StatCard>
            <StatCard $variant="active">
              <StatLabel>Total Active</StatLabel>
              <StatValue>{Number(stats.totalActive).toLocaleString()}</StatValue>
            </StatCard>
            <StatCard $variant="deaths">
              <StatLabel>Total Deaths</StatLabel>
              <StatValue>{Number(stats.totalDeaths).toLocaleString()}</StatValue>
            </StatCard>
          </StatsGrid>
        </>
      ) : null}
    </PageContainer>
  )
}

export default StateDetailsPage
