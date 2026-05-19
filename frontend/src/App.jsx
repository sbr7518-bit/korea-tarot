import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

import LoginPage from './pages/AuthPage/LoginPage'
import SignupPage from './pages/AuthPage/SignupPage'
import HomePage from './pages/HomePage/HomePage'
import CardSelectPage from './pages/CardSelectPage/CardSelectPage'
import ConsultationPage from './pages/ConsultationPage/ConsultationPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'

function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/cards" element={<PrivateRoute><CardSelectPage /></PrivateRoute>} />
      <Route path="/consultation/:id" element={<PrivateRoute><ConsultationPage /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
