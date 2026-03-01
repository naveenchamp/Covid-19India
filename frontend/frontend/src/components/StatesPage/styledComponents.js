import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {
  FieldLabel,
  GhostLinkStyle,
  MutedText,
  Page,
  PageSubtitle,
  PageTitle,
  PrimaryLinkStyle,
  SectionEyebrow,
  SectionHeader,
  StatusMessage,
  TextInput,
} from '../shared/styledComponents'

export const PageContainer = styled(Page)``

export const Header = styled(SectionHeader)``

export const Eyebrow = styled(SectionEyebrow)``

export const Title = styled(PageTitle)``

export const Subtitle = styled(PageSubtitle)``

export const SearchField = styled.label`
  display: grid;
  gap: 0.4rem;
  min-width: 240px;

  @media (max-width: 760px) {
    width: 100%;
    min-width: 0;
  }
`

export const SearchLabel = styled(FieldLabel)``

export const SearchInput = styled(TextInput)``

export const PageStatus = styled(StatusMessage)``

export const StatesGrid = styled.div`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`

export const StateCard = styled.article`
  display: grid;
  gap: 0.45rem;
  align-content: start;
  border: 1px solid #efdfc4;
  border-radius: var(--radius-md);
  padding: 0.9rem;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 223, 0.95)),
    rgba(255, 255, 255, 0.9);
`

export const StateName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
`

export const PopulationLabel = styled(MutedText)``

export const PopulationValue = styled.p`
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
  font-weight: 800;
`

export const ViewButton = styled(Link)`
  ${PrimaryLinkStyle}
`

export const EmptyStatus = styled(StatusMessage)`
  background-color: #f2efe8;
  color: var(--ink-700);
`
