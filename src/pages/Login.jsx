import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <>
      <Header showUser={false} />
      <div className="page">
        <div className="card">
          <h3>Student Login</h3>
          <p className="subtitle">Himadri Boys Hostel · 3rd Year Allotment</p>

          <div className="field">
            <label htmlFor="roll">Roll Number</label>
            <input type="text" id="roll" placeholder="e.g. 22BCS045" />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>

          <button className="btn" onClick={handleLogin}>Login</button>

          <p className="forgot"><a href="#">Forgot password?</a></p>
          <p className="footer-note">For access issues, contact hostel admin</p>
        </div>
      </div>
    </>
  )
}
