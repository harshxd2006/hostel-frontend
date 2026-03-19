import { useNavigate, useLocation } from 'react-router-dom'
import { useRequests } from '../context/RequestContext'

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { pendingCount } = useRequests()

  const navItems = [
    { label: 'Homepage', path: '/', id: 'home' },
    { label: 'My Portal', path: '/my-portal', id: 'my-portal' },
    { label: 'Room Availability', path: '/room-availability', id: 'room-availability' },
    { label: 'Pending Requests', path: '/pending-requests', id: 'pending-requests', badge: pendingCount || null },
    { label: 'My Batch Info', path: null, id: 'batch-info' },
    { label: 'Booking Status', path: null, id: 'booking-status' },
    { label: 'Help & Support', path: null, id: 'help-support' },
  ]

  const isActive = (item) => {
    if (item.path === '/') return location.pathname === '/'
    if (item.path) return location.pathname === item.path
    return false
  }

  const handleClick = (item) => {
    if (item.path) { navigate(item.path); if (closeSidebar) closeSidebar() }
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={closeSidebar} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`sidebar-section${isActive(item) ? ' active' : ''}`}
            onClick={() => handleClick(item)}
          >
            <div className="section-header">
              <span className="icon" />
              <h3>{item.label}</h3>
              {item.badge ? <span className="badge">{item.badge}</span> : null}
            </div>
            <div className="section-content" />
          </div>
        ))}
      </aside>
    </>
  )
}