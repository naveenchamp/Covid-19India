import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'
import {
  GhostLinkStyle,
  MutedText,
  Page,
  PageSubtitle,
  PageTitle,
  SectionEyebrow,
  SectionHeader,
  StatusMessage,
} from '../shared/styledComponents'

export const PageContainer = styled(Page)``

export const Header = styled(SectionHeader)``

export const Eyebrow = styled(SectionEyebrow)``

export const Title = styled(PageTitle)``

export const Subtitle = styled(PageSubtitle)``

export const BackButton = styled(Link)`
  ${GhostLinkStyle}
`

export const PageStatus = styled(StatusMessage)``

export const InfoStrip = styled.div`
  margin-bottom: 0.9rem;
  border: 1px solid #efdfc4;
  background-color: #fffaf0;
  border-radius: var(--radius-md);
  padding: 0.8rem;
`

export const PopulationLabel = styled(MutedText)``

export const PopulationValue = styled.h3`
  margin: 0.2rem 0 0;
  font-size: 1.35rem;
`

export const StatsGrid = styled.div`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
`

const variantStyles = {
  cases: css`
    background: linear-gradient(120deg, #374f80, #51659a);
  `,
  cured: css`
    background: linear-gradient(120deg, #2c8f67, #44a987);
  `,
  active: css`
    background: linear-gradient(120deg, #bb6f2f, #d58a47);
  `,
  deaths: css`
    background: linear-gradient(120deg, #9d4440, #bc5953);
  `,
}

export const StatCard = styled.article`
  border-radius: var(--radius-md);
  padding: 0.9rem;
  color: #ffffff;
  display: grid;
  gap: 0.3rem;
  ${({$variant}) => variantStyles[$variant] || variantStyles.cases}
`

export const StatLabel = styled.p`
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.92;
`

export const StatValue = styled.strong`
  font-size: 1.3rem;
  letter-spacing: 0.02em;
`
