import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import SamplePage from './pages/SamplePage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/login"      element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard"  element={<DashboardPage />} />
          <Route path="/admin"      element={<AdminPage />} />
          <Route path="/sample"     element={<SamplePage />} />
          {/* Public profile — must be last */}
          <Route path="/:username"  element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
