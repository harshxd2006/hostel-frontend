import { Routes, Route, Navigate } from 'react-router-dom'
import Layout          from './components/Layout'
import Login           from './pages/Login'
import Homepage        from './pages/Homepage'
import MyPortal        from './pages/MyPortal'
import RoomAvailability from './pages/RoomAvailability'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/"                  element={<Homepage />} />
        <Route path="/my-portal"         element={<MyPortal />} />
        <Route path="/room-availability" element={<RoomAvailability />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
