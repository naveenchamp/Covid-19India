import {useState} from 'react'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import {getStoredToken, loginUser, setStoredToken} from '../../api'
import {
  AuthCard,
  ErrorText,
  Eyebrow,
  LoginField,
  LoginFieldLabel,
  LoginForm,
  LoginInput,
  LoginPageContainer,
  SubmitButton,
  Subtitle,
  Title,
} from './styledComponents'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = getStoredToken()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (token) {
    return <Navigate to="/" replace />
  }

  const submitLogin = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await loginUser({username, password})
      setStoredToken(response.jwtToken)
      const nextPath = location.state?.from?.pathname || '/'
      navigate(nextPath, {replace: true})
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <LoginPageContainer>
      <AuthCard>
        <Eyebrow>Secure Access</Eyebrow>
        <Title>Sign in to Covid-19 India Portal</Title>
        <Subtitle>
          Use the backend login credentials to retrieve a JWT token and unlock
          all state and district APIs.
        </Subtitle>

        <LoginForm onSubmit={submitLogin}>
          <LoginField>
            <LoginFieldLabel>Username</LoginFieldLabel>
            <LoginInput
              type="text"
              placeholder="christopher_phillips"
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
            />
          </LoginField>

          <LoginField>
            <LoginFieldLabel>Password</LoginFieldLabel>
            <LoginInput
              type="password"
              placeholder="christy@123"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </LoginField>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </SubmitButton>

          {errorMessage ? <ErrorText $variant="error">{errorMessage}</ErrorText> : null}
        </LoginForm>
      </AuthCard>
    </LoginPageContainer>
  )
}

export default LoginPage
