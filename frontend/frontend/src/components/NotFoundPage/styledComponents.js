import {Link} from 'react-router-dom'
import {styled} from 'styled-components'
import {
  Page,
  PageSubtitle,
  PageTitle,
  Panel,
  PrimaryLinkStyle,
  SectionEyebrow,
} from '../shared/styledComponents'

export const PageContainer = styled(Page)``

export const NotFoundCard = styled(Panel)`
  text-align: center;
  display: grid;
  gap: 0.65rem;
  justify-items: center;
`

export const Eyebrow = styled(SectionEyebrow)``

export const Title = styled(PageTitle)``

export const Subtitle = styled(PageSubtitle)``

export const HomeButton = styled(Link)`
  ${PrimaryLinkStyle}
`
