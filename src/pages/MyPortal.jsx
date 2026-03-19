import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomMap from '../components/RoomMap'
import { useRequests, CURRENT_USER } from '../context/RequestContext'
import { groundFloor, floor1, floor2, floor3, floor4, floor5, floor6 } from './floorData'

const ALL_ROOMS = [
  ...Object.values(groundFloor).flat(),
  ...Object.values(floor1).flat(),
  ...Object.values(floor2).flat(),
  ...Object.values(floor3).flat(),
  ...Object.values(floor4).flat(),
  ...Object.values(floor5).flat(),
  ...Object.values(floor6).flat(),
].filter(r => r && r.id)

function getRoomCapacity(roomId) {
  return ALL_ROOMS.find(r => r.id === roomId)?.cap || 3
}

const ALL_STUDENTS = [
  { name: 'Anshu', roll: '25' }, { name: 'Harsh', roll: '19' },
  { name: 'Priya', roll: '42' }, { name: 'Rahul', roll: '33' },
  { name: 'Neha', roll: '17' }, { name: 'Vikram', roll: '28' },
  { name: 'Sneha', roll: '45' }, { name: 'Karan', roll: '12' },
  { name: 'Pooja', roll: '38' }, { name: 'Arjun', roll: '22' },
  { name: 'Aditi', roll: '50' }, { name: 'Ravi', roll: '31' },
  { name: 'Simran', roll: '44' }, { name: 'Rohan', roll: '18' },
  { name: 'Ananya', roll: '27' }, { name: 'Ishaan', roll: '36' },
  { name: 'Diya', roll: '49' }, { name: 'Kunal', roll: '14' },
  { name: 'Meera', roll: '40' }, { name: 'Sahil', roll: '23' },
  { name: 'Riya', roll: '47' }, { name: 'Ayush', roll: '11' },
  { name: 'Tanvi', roll: '35' }, { name: 'Siddharth', roll: '29' },
  { name: 'Laksh', roll: '21' }, { name: 'Kavya', roll: '43' },
  { name: 'Nikhil', roll: '16' }, { name: 'Anika', roll: '39' },
  { name: 'Yash', roll: '26' }, { name: 'Divya', roll: '48' },
  { name: 'Aman', roll: '13' }, { name: 'Shruti', roll: '41' },
  { name: 'Varun', roll: '24' }, { name: 'Nisha', roll: '37' },
  { name: 'Akash', roll: '15' }, { name: 'Tanya', roll: '46' },
  { name: 'Rohit', roll: '20' }, { name: 'Kiara', roll: '32' },
  { name: 'Aryan', roll: '10' }, { name: 'Zara', roll: '34' },
  { name: 'Dev', roll: '30' }, { name: 'Sara', roll: '51' },
  { name: 'Rishabh', roll: '09' }, { name: 'Isha', roll: '52' },
  { name: 'Pranav', roll: '08' }, { name: 'Muskan', roll: '53' },
  { name: 'Vivek', roll: '07' }, { name: 'Anjali', roll: '54' },
  { name: 'Karthik', roll: '06' }, { name: 'Pallavi', roll: '55' },
  { name: 'Mohit', roll: '05' }, { name: 'Navya', roll: '56' },
  { name: 'Aditya', roll: '04' }, { name: 'Sakshi', roll: '57' },
  { name: 'Manish', roll: '03' }, { name: 'Deepika', roll: '58' },
  { name: 'Saurabh', roll: '02' }, { name: 'Ritika', roll: '59' },
  { name: 'Gaurav', roll: '01' }, { name: 'Preeti', roll: '60' },
  { name: 'Rajat', roll: '61' }, { name: 'Swati', roll: '62' },
  { name: 'Dhruv', roll: '63' }, { name: 'Nikita', roll: '64' },
  { name: 'Shubham', roll: '65' }, { name: 'Jyoti', roll: '66' },
  { name: 'Abhishek', roll: '67' }, { name: 'Komal', roll: '68' },
  { name: 'Pankaj', roll: '69' }, { name: 'Megha', roll: '70' },
  { name: 'Sumit', roll: '71' }, { name: 'Payal', roll: '72' },
  { name: 'Tarun', roll: '73' }, { name: 'Seema', roll: '74' },
  { name: 'Nitin', roll: '75' },
]

function findStudent(roll) {
  return ALL_STUDENTS.find(s => s.roll === roll.trim()) || null
}

const PORTAL_STATE_KEY = 'nith_portal_state'

function loadPortalState() {
  try { return JSON.parse(localStorage.getItem(PORTAL_STATE_KEY) || 'null') }
  catch { return null }
}
function savePortalState(state) {
  localStorage.setItem(PORTAL_STATE_KEY, JSON.stringify(state))
}

const ordinal = ['1st', '2nd', '3rd']

// ── Roommate box ────────────────────────────────────────────────────────────
function RoommateBox({ index, roll, onRollChange, error, reqStatus, onSend, requestSent }) {
  const resolved = roll.trim() ? findStudent(roll) : null

  const statusCfg = {
    pending: { bg: '#fff3cd', color: '#856404', border: '#ffeeba', label: 'Pending', boxBg: '#fffdf0', boxBorder: '#f0c940' },
    accepted: { bg: '#d4edda', color: '#155724', border: '#c3e6cb', label: 'Accepted', boxBg: '#f0fdf4', boxBorder: '#22c55e' },
    declined: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb', label: 'Declined', boxBg: '#fef2f2', boxBorder: '#ef4444' },
  }

  const cfg = reqStatus ? statusCfg[reqStatus] : null
  const boxBorder = cfg ? cfg.boxBorder : error ? '#dc3545' : resolved ? '#2E6DA4' : '#e0e0e0'
  const boxBg = cfg ? cfg.boxBg : resolved ? '#f0f8ff' : '#fafafa'

  return (
    <div style={{ marginBottom: 16, padding: '16px 18px', border: `1.5px solid ${boxBorder}`, borderRadius: 10, background: boxBg, transition: 'all 0.3s' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#2E6DA4', marginBottom: 12 }}>
        {ordinal[index] || `${index + 1}th`} Roommate
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {/* Roll */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>Roll No.</span>
          <input
            type="text" value={roll}
            onChange={e => onRollChange(e.target.value)}
            disabled={requestSent}
            placeholder="e.g. 33"
            style={{ width: 90, padding: '9px 12px', border: `1.5px solid ${error ? '#dc3545' : resolved ? '#2E6DA4' : '#ccc'}`, borderRadius: 8, fontSize: 14, outline: 'none', color: '#333', background: requestSent ? '#f4f4f4' : 'white', cursor: requestSent ? 'not-allowed' : 'text' }}
          />
        </div>

        {/* Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 140 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>Name</span>
          <div style={{ flex: 1, padding: '9px 12px', background: resolved ? 'white' : '#f4f4f4', border: `1.5px solid ${resolved ? '#2E6DA4' : '#e0e0e0'}`, borderRadius: 8, fontSize: 14, color: resolved ? '#1e293b' : '#aaa', fontWeight: resolved ? 600 : 400 }}>
            {resolved?.name || 'Auto-filled'}
          </div>
        </div>

        {/* Send button OR status badge */}
        {!requestSent ? (
          <button
            onClick={() => onSend(index)}
            disabled={!resolved || !!error}
            style={{ background: resolved && !error ? '#2E6DA4' : '#ccc', color: 'white', border: 'none', padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: resolved && !error ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
            onMouseOver={e => { if (resolved && !error) e.target.style.background = '#1d5a8a' }}
            onMouseOut={e => { if (resolved && !error) e.target.style.background = '#2E6DA4' }}
          >
            Send Request
          </button>
        ) : (
          <span style={{ padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap', background: cfg?.bg, color: cfg?.color, border: `1px solid ${cfg?.border}` }}>
            {cfg?.label}
          </span>
        )}
      </div>

      {/* Sub-messages */}
      {error && <div style={{ marginTop: 8, fontSize: 12, color: '#dc3545' }}>⚠ {error}</div>}
      {resolved && !requestSent && !error && (
        <div style={{ marginTop: 6, fontSize: 12, color: '#2E6DA4' }}>✓ Student found — click Send Request</div>
      )}
      {requestSent && reqStatus === 'pending' && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#856404' }}>Request sent · waiting for response…</div>
      )}
      {requestSent && reqStatus === 'accepted' && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#155724', fontWeight: 600 }}> Accepted! This roommate is confirmed.</div>
      )}
      {requestSent && reqStatus === 'declined' && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#721c24' }}>Request declined by this student.</div>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function MyPortal() {
  const navigate = useNavigate()
  const { sendRequest, requests } = useRequests()

  // Restore state from localStorage on mount
  const saved = loadPortalState()

  const [selectedRoom, setSelectedRoom] = useState(saved?.selectedRoom || null)
  const [rolls, setRolls] = useState(saved?.rolls || ['', ''])
  const [errors, setErrors] = useState(saved?.errors || ['', ''])
  const [reqIds, setReqIds] = useState(saved?.reqIds || [null, null])

  // Persist state whenever it changes
  useEffect(() => {
    savePortalState({ selectedRoom, rolls, errors, reqIds })
  }, [selectedRoom, rolls, errors, reqIds])

  // Adjust slots when room changes (only if no requests sent yet)
  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId)
    // Only reset if no requests have been sent yet
    if (!reqIds.some(Boolean)) {
      const needed = getRoomCapacity(roomId) - 1
      setRolls(Array(needed).fill(''))
      setErrors(Array(needed).fill(''))
      setReqIds(Array(needed).fill(null))
    }
  }

  const updateRoll = (i, val) => {
    if (reqIds[i]) return
    setRolls(prev => prev.map((r, idx) => idx === i ? val : r))
    setErrors(prev => prev.map((e, idx) => idx === i ? '' : e))
  }

  const handleSend = (i) => {
    const roll = rolls[i].trim()
    const student = findStudent(roll)
    if (!student) {
      setErrors(prev => prev.map((e, idx) => idx === i ? 'No student with this roll number.' : e))
      return
    }
    const otherRolls = rolls.filter((_, idx) => idx !== i).map(r => r.trim())
    if (otherRolls.includes(roll)) {
      setErrors(prev => prev.map((e, idx) => idx === i ? 'Duplicate — already selected.' : e))
      return
    }
    const newReq = sendRequest(CURRENT_USER, selectedRoom, { roll: student.roll, name: student.name })
    setReqIds(prev => prev.map((id, idx) => idx === i ? newReq.id : id))
    window.open(`/email-preview?id=${newReq.id}`, '_blank')
  }

  // Live status — always read from latest requests
  const getStatus = (id) => id ? (requests.find(r => r.id === id)?.status || 'pending') : null
  const statuses = reqIds.map(getStatus)

  // All slots that had a request sent must have responded (accepted or declined)
  const sentCount = reqIds.filter(Boolean).length
  const respondedCount = statuses.filter(s => s === 'accepted' || s === 'declined').length
  const allResponded = sentCount > 0 && respondedCount === sentCount

  const handleFinalSubmit = () => {
    // Clear saved portal state on final submit
    localStorage.removeItem(PORTAL_STATE_KEY)
    navigate('/')
  }

  const cap = selectedRoom ? getRoomCapacity(selectedRoom) : null

  return (
    <div className="content-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Portal page</h2>
        <div style={{ fontSize: 16, color: '#333', fontWeight: 500 }}>
          Time remaining : <span style={{ fontWeight: 600 }}>24:35</span>
        </div>
      </div>

      <div style={{ border: '2px solid #555', backgroundColor: '#fcfcfc', padding: 20, borderRadius: 12, marginBottom: 30, fontSize: 16, color: '#333', lineHeight: 1.8 }}>
        <div style={{ fontWeight: 500 }}>Anshu Roy. &nbsp;(25BPH025)</div>
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}><span>Rank : 50</span><span>Batch : B</span></div>
        <div>CGPI : 8.7</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, color: '#555', marginBottom: 5, fontWeight: 500 }}>Room map :</h3>
        <h3 style={{ fontSize: 18, color: '#333', fontWeight: 600, letterSpacing: '0.5px' }}>SELECT ROOM AND FLOOR.</h3>
      </div>

      <RoomMap selectedRoom={selectedRoom} onSelectRoom={handleRoomSelect} />

      <div style={{ marginTop: 60, maxWidth: 580 }}>
        <h3 style={{ fontSize: 16, color: '#333', marginBottom: 6, fontWeight: 500, letterSpacing: '1px' }}>SELECT ROOMMATES :</h3>

        {cap && (
          <div style={{ fontSize: 13, color: '#2E6DA4', background: '#f0f8ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 14px', marginBottom: 16, display: 'inline-block' }}>
            Room {selectedRoom} is a <strong>{cap}-seater</strong> — you need <strong>{cap - 1} roommate{cap - 1 > 1 ? 's' : ''}</strong>
          </div>
        )}
        {!selectedRoom && (
          <p style={{ fontSize: 13, color: '#aaa', marginBottom: 16 }}>Select a room above to see roommate fields.</p>
        )}

        {rolls.map((r, i) => (
          <RoommateBox
            key={i}
            index={i}
            roll={r}
            onRollChange={v => updateRoll(i, v)}
            error={errors[i]}
            reqStatus={statuses[i]}
            onSend={handleSend}
            requestSent={!!reqIds[i]}
          />
        ))}

        <div style={{ marginTop: 32, marginBottom: 50, textAlign: 'center' }}>
          {allResponded ? (
            <button
              onClick={handleFinalSubmit}
              style={{ background: '#2E6DA4', color: 'white', border: 'none', padding: '13px 36px', fontSize: 16, fontWeight: 600, borderRadius: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(46,109,164,0.35)', transition: 'all 0.2s' }}
              onMouseOver={e => e.target.style.background = '#1d5a8a'}
              onMouseOut={e => e.target.style.background = '#2E6DA4'}
            >
              Confirm &amp; Submit
            </button>
          ) : (
            <div style={{ fontSize: 13, color: '#aaa' }}>
              {reqIds.some(Boolean)
                ? `Waiting for responses… (${respondedCount}/${sentCount} responded)`
                : 'Send requests to your roommates first.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}