import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {getStoredToken} from '../../api'
import {ProtectedOutletWrapper} from './styledComponents'

function ProtectedRoute() {
  const token = getStoredToken()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return (
    <ProtectedOutletWrapper>
      <Outlet />
    </ProtectedOutletWrapper>
  )
}

export default ProtectedRoute
