import {styled} from 'styled-components'
import {
  Field,
  FieldLabel,
  FormGrid,
  PageSubtitle,
  PageTitle,
  PrimaryButton,
  SectionEyebrow,
  StatusMessage,
  TextInput,
} from '../shared/styledComponents'

export const LoginPageContainer = styled.section`
  width: min(1100px, calc(100% - 2rem));
  margin: 1.5rem auto;
  min-height: calc(100vh - 3rem);
  display: grid;
  place-items: center;

  @media (max-width: 760px) {
    width: calc(100% - 1rem);
    margin: 0.5rem auto 1rem;
  }
`

export const AuthCard = styled.div`
  width: min(500px, 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at top right, rgba(242, 109, 61, 0.1), transparent 40%),
    #ffffff;
  padding: 1.4rem;
  box-shadow: var(--shadow);
`

export const Eyebrow = styled(SectionEyebrow)``

export const Title = styled(PageTitle)``

export const Subtitle = styled(PageSubtitle)``

export const LoginForm = styled(FormGrid)`
  grid-template-columns: 1fr;
  margin-top: 0.9rem;
`

export const LoginField = styled(Field)``

export const LoginFieldLabel = styled(FieldLabel)``

export const LoginInput = styled(TextInput)``

export const SubmitButton = styled(PrimaryButton)``

export const ErrorText = styled(StatusMessage)``
