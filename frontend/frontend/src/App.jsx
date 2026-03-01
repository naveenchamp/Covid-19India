import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import CreateDistrictPage from './components/CreateDistrictPage'
import DistrictExplorerPage from './components/DistrictExplorerPage'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import StateDetailsPage from './components/StateDetailsPage'
import StatesPage from './components/StatesPage'
import {GlobalStyles} from './styles/styledComponents'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<StatesPage />} />
            <Route path="/states/:stateId" element={<StateDetailsPage />} />
            <Route path="/districts/new" element={<CreateDistrictPage />} />
            <Route
              path="/districts/explore"
              element={<DistrictExplorerPage />}
            />
            <Route path="/not-found" element={<NotFoundPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
