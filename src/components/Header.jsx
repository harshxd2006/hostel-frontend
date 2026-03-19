import { useNavigate } from 'react-router-dom'

export default function Header({ showUser = true, onToggleSidebar }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="header">
        <img src="/nith_logo.png" alt="NIT Hamirpur Logo" className="header-logo" />
        <div className="header-text">
          <div className="hindi">राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर</div>
          <div className="english">National Institute of Technology Hamirpur</div>
          <div className="sub">(An Institute of National Importance)</div>
        </div>
        {showUser && (
          <div className="header-user">
            <span className="user-name">Anshu Kumar</span>
            <span className="user-roll">22BCS045</span>
            <button className="logout-btn" onClick={() => navigate('/login')}>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="blue-bar">
        <h2>Hostel Allotment Portal 2026</h2>
        {showUser && (
          <button className="hamburger-btn" onClick={onToggleSidebar}>
            ☰
          </button>
        )}
      </div>
    </>
  )
}
