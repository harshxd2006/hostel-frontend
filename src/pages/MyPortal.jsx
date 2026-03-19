import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import RoomMap from '../components/RoomMap'

export default function MyPortal() {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [rm1, setRm1] = useState('')
  const [rm2, setRm2] = useState('')

  const handleSubmit = () => {
    alert('Submission successful! Your selected roommates and room have been confirmed.')
  }

  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          <div className="content-section">

            {/* Title + Timer */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 className="section-title" style={{ marginBottom:0 }}>Portal page</h2>
              <div style={{ fontSize:16, color:'#333', fontWeight:500 }}>
                <span>Time remaining : </span>
                <span style={{ fontWeight:600 }}>24:35</span>
              </div>
            </div>

            {/* Student Info Card */}
            <div style={{ border:'2px solid #555', backgroundColor:'#fcfcfc', padding:20, borderRadius:12, marginBottom:30, fontSize:16, color:'#333', lineHeight:1.8 }}>
              <div style={{ fontWeight:500 }}>Anshu Roy. &nbsp;(25BPH025)</div>
              <div style={{ display:'flex', gap:80 }}>
                <span>Rank : 50</span>
                <span>Batch : B</span>
              </div>
              <div><span>CGPI : 8.7</span></div>
            </div>

            <div style={{ marginBottom:20 }}>
              <h3 style={{ fontSize:16, color:'#555', marginBottom:5, fontWeight:500 }}>Room map :</h3>
              <h3 style={{ fontSize:18, color:'#333', fontWeight:600, letterSpacing:'0.5px' }}>SELECT ROOM AND FLOOR.</h3>
            </div>

            {/* Room Map */}
            <RoomMap selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />

            {/* Roommates + Submit */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:60 }}>
              <div style={{ width:'100%', maxWidth:500 }}>
                <div style={{ marginBottom:30 }}>
                  <h3 style={{ fontSize:16, color:'#333', marginBottom:20, fontWeight:500, letterSpacing:'1px' }}>SELECT ROOMMATES :</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:15 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:15 }}>
                      <label style={{ fontWeight:500, fontSize:16, minWidth:70, color:'#333' }}>1st RM</label>
                      <input
                        type="text"
                        value={rm1}
                        onChange={e => setRm1(e.target.value)}
                        style={{ flex:1, padding:'12px 15px', border:'1px solid #ccc', borderRadius:8, fontSize:16, outline:'none', color:'#333' }}
                        onFocus={e  => e.target.style.borderColor = '#2E6DA4'}
                        onBlur={e   => e.target.style.borderColor = '#ccc'}
                      />
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:15 }}>
                      <label style={{ fontWeight:500, fontSize:16, minWidth:70, color:'#333' }}>2nd RM</label>
                      <input
                        type="text"
                        value={rm2}
                        onChange={e => setRm2(e.target.value)}
                        style={{ flex:1, padding:'12px 15px', border:'1px solid #ccc', borderRadius:8, fontSize:16, outline:'none', color:'#333' }}
                        onFocus={e  => e.target.style.borderColor = '#2E6DA4'}
                        onBlur={e   => e.target.style.borderColor = '#ccc'}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:40, marginBottom:50, textAlign:'center' }}>
                  <button
                    onClick={handleSubmit}
                    style={{ background:'white', color:'#333', border:'1px solid #999', padding:'12px 30px', fontSize:16, fontWeight:500, borderRadius:6, cursor:'pointer', transition:'all 0.2s', boxShadow:'0 4px 6px rgba(0,0,0,0.05)' }}
                    onMouseOver={e => { e.target.style.background='#2E6DA4'; e.target.style.color='white'; e.target.style.borderColor='#2E6DA4' }}
                    onMouseOut={e  => { e.target.style.background='white';   e.target.style.color='#333';  e.target.style.borderColor='#999'    }}
                  >
                    Confirm &amp; Submit
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
