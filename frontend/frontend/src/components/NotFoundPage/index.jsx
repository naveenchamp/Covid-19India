import {
  Eyebrow,
  HomeButton,
  NotFoundCard,
  PageContainer,
  Subtitle,
  Title,
} from './styledComponents'

function NotFoundPage() {
  return (
    <PageContainer>
      <NotFoundCard>
        <Eyebrow>404</Eyebrow>
        <Title>Page not found</Title>
        <Subtitle>This route does not exist in the dashboard.</Subtitle>
        <HomeButton to="/">Go to Home</HomeButton>
      </NotFoundCard>
    </PageContainer>
  )
}

export default NotFoundPage
