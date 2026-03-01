import styled from 'styled-components'
import {
  DangerButton,
  Field,
  FieldLabel,
  FormGrid,
  Page,
  PageSubtitle,
  PageTitle,
  Panel,
  PrimaryButton,
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

export const SearchPanel = styled.form`
  border: 1px solid #efdfc4;
  border-radius: var(--radius-md);
  padding: 0.95rem;
  background-color: #fffaf0;
  display: flex;
  align-items: end;
  gap: 0.8rem;
  margin-bottom: 0.8rem;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const SearchField = styled(Field)``

export const SearchFieldLabel = styled(FieldLabel)``

export const SearchInput = styled(TextInput)``

export const SearchButton = styled(PrimaryButton)``

export const DistrictFormPanel = styled(Panel)``

export const DistrictForm = styled(FormGrid).attrs({as: 'form'})``

export const DistrictField = styled(Field)``

export const DistrictFieldLabel = styled(FieldLabel)``

export const DistrictInput = styled(TextInput)``

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;

  @media (max-width: 760px) {
    flex-wrap: wrap;
  }
`

export const UpdateButton = styled(PrimaryButton)``

export const DeleteButton = styled(DangerButton)``

export const ExplorerStatus = styled(StatusMessage)`
  margin-top: 0.8rem;
`
