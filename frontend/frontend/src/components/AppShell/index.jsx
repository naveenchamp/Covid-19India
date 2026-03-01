import {Outlet, useNavigate} from 'react-router-dom'
import {clearStoredToken} from '../../api'
import {
  BrandEyebrow,
  BrandTitle,
  Content,
  LogoutButton,
  Navigation,
  NavItem,
  Shell,
  TopBar,
} from './styledComponents'

const NAV_ITEMS = [
  {to: '/', label: 'States'},
  {to: '/districts/new', label: 'Add District'},
  {to: '/districts/explore', label: 'District Explorer'},
]

function AppShell() {
  const navigate = useNavigate()

  const onLogout = () => {
    clearStoredToken()
    navigate('/login', {replace: true})
  }

  return (
    <Shell>
      <TopBar>
        <div>
          <BrandEyebrow>Covid Portal</BrandEyebrow>
          <BrandTitle>India Monitoring Console</BrandTitle>
        </div>
        <LogoutButton onClick={onLogout} type="button">
          Logout
        </LogoutButton>
      </TopBar>

      <Navigation>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            className={({isActive}) => (isActive ? 'active' : '')}
            end={item.to === '/'}
          >
            {item.label}
          </NavItem>
        ))}
      </Navigation>

      <Content>
        <Outlet />
      </Content>
    </Shell>
  )
}

export default AppShell
