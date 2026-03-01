import {styled} from 'styled-components'
import {
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
  SelectInput,
  StatusMessage,
  TextInput,
} from '../shared/styledComponents'

export const PageContainer = styled(Page)``

export const Header = styled(SectionHeader)``

export const Eyebrow = styled(SectionEyebrow)``

export const Title = styled(PageTitle)``

export const Subtitle = styled(PageSubtitle)``

export const DistrictFormPanel = styled(Panel)``

export const DistrictForm = styled(FormGrid).attrs({as: 'form'})``

export const DistrictField = styled(Field)``

export const DistrictFieldLabel = styled(FieldLabel)``

export const DistrictInput = styled(TextInput)``

export const DistrictSelect = styled(SelectInput)``

export const SubmitButton = styled(PrimaryButton)``

export const FormStatus = styled(StatusMessage)``
