import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Homepage',          path: '/',                  id: 'home' },
  { label: 'My Portal',         path: '/my-portal',         id: 'my-portal' },
  { label: 'Room Availability', path: '/room-availability', id: 'room-availability' },
  { label: 'Pending Requests',  path: null,                 id: 'pending-requests', badge: 2 },
  { label: 'My Batch Info',     path: null,                 id: 'batch-info' },
  { label: 'Booking Status',    path: null,                 id: 'booking-status' },
  { label: 'Help & Support',    path: null,                 id: 'help-support' },
]

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate  = useNavigate()
  const location  = useLocation()

  const isActive = (item) => {
    if (item.path === '/') return location.pathname === '/'
    if (item.path)         return location.pathname === item.path
    return false
  }

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path)
      if (closeSidebar) closeSidebar()
    }
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-section${isActive(item) ? ' active' : ''}`}
            onClick={() => handleClick(item)}
          >
            <div className="section-header">
              <span className="icon"></span>
              <h3>{item.label}</h3>
              {item.badge && <span className="badge">{item.badge}</span>}
            </div>
            <div className="section-content"></div>
          </div>
        ))}
      </aside>
    </>
  )
}
