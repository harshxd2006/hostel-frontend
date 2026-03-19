import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import MyPortal from './pages/MyPortal'
import RoomAvailability from './pages/RoomAvailability'
import PendingRequests from './pages/PendingRequests'
import SimulatedEmail from './pages/SimulatedEmail'
import RespondPage from './pages/RespondPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/email-preview" element={<SimulatedEmail />} />
      <Route path="/respond" element={<RespondPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/my-portal" element={<MyPortal />} />
        <Route path="/room-availability" element={<RoomAvailability />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}