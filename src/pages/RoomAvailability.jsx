import RoomMap from '../components/RoomMap'

export default function RoomAvailability() {
  return (
    <div className="content-section">
      <h2 className="section-title">Room Availability</h2>

      {/* Stats */}
      <div className="room-stats-container">
        <div className="stat-card"><span className="stat-value">130</span><span className="stat-label">Total Rooms</span></div>
        <div className="stat-card"><span className="stat-value">10</span><span className="stat-label">(F) Occupied</span></div>
        <div className="stat-card"><span className="stat-value">2</span><span className="stat-label">(P) Occupied</span></div>
        <div className="stat-card"><span className="stat-value">118</span><span className="stat-label">Remain</span></div>
      </div>

      <div style={{ textAlign:'right', fontSize:12, color:'#777', marginTop:-12, marginBottom:24, fontWeight:500 }}>
        * F = Fully Occupied &nbsp;|&nbsp; P = Partially Occupied
      </div>

      {/* Room Map (readonly — no selection) */}
      <RoomMap readonly={true} />
    </div>
  )
}
