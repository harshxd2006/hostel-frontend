import { useState, useEffect, useRef } from 'react'
import { groundFloor, floor1, floor2, floor3, floor4, floor5, floor6 } from '../pages/floorData'

const floors = {
  ground: groundFloor,
  1: floor1, 2: floor2, 3: floor3, 4: floor4, 5: floor5, 6: floor6,
}

const firstNames = ["Aarav","Ananya","Rahul","Priya","Vikram","Neha","Rohan","Sneha","Karan","Pooja","Arjun","Aditi","Ravi","Simran"]
const lastNames  = ["Sharma","Verma","Singh","Patel","Gupta","Das","Jain","Mehta","Rao","Kumar","Yadav","Chauhan"]

function randName() {
  return firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' + lastNames[Math.floor(Math.random()*lastNames.length)]
}

function genOccupants(cap) {
  const leaderCgpi = (8.5 + Math.random()*1.49).toFixed(2)
  const arr = [{ name: randName(), cgpi: leaderCgpi, isLeader: true }]
  for (let i = 1; i < cap; i++) {
    const cgpi = (6.5 + Math.random()*(parseFloat(leaderCgpi)-0.1-6.5)).toFixed(2)
    arr.push({ name: randName(), cgpi, isLeader: false })
  }
  return arr
}

function Room({ room, capacityFilter, selectedRoom, onSelect, tooltip }) {
  const hidden   = capacityFilter !== 'all' && String(room.cap) !== capacityFilter
  const selected = selectedRoom === room.id
  const cls = ['room', room.booked ? 'booked' : 'available', selected ? 'selected' : '', hidden ? 'hidden' : ''].join(' ')

  const handleMouseEnter = (e) => {
    if (!room.booked) return
    tooltip.show(room, e.currentTarget)
  }
  const handleMouseLeave = () => tooltip.hide()

  return (
    <div
      className={cls}
      onClick={() => onSelect(room)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {room.id}
      <span className="capacity-badge">{room.cap}</span>
    </div>
  )
}

export default function RoomMap({ selectedRoom, onSelectRoom, readonly = false }) {
  const [activeFloor,     setActiveFloor]     = useState('ground')
  const [capacityFilter,  setCapacityFilter]  = useState('all')
  const tooltipRef   = useRef(null)
  const occupantCache = useRef({})

  // Tooltip helpers
  const tooltip = {
    show(room, el) {
      if (!tooltipRef.current) return
      if (!occupantCache.current[room.id]) {
        occupantCache.current[room.id] = genOccupants(room.cap)
      }
      const occ = occupantCache.current[room.id]
      let html = `<div class="tooltip-title">Room ${room.id} Occupants</div>`
      occ.forEach(o => {
        html += o.isLeader
          ? `<div class="tooltip-leader"><span>👑 ${o.name}</span><span class="cgpi-badge">CGPI: ${o.cgpi}</span></div>`
          : `<div class="tooltip-roommate"><span>${o.name}</span><span class="cgpi-badge">CGPI: ${o.cgpi}</span></div>`
      })
      tooltipRef.current.innerHTML = html
      tooltipRef.current.classList.add('show')
      const rect = el.getBoundingClientRect()
      let top  = rect.top  - tooltipRef.current.offsetHeight - 12
      let left = rect.left + rect.width/2 - tooltipRef.current.offsetWidth/2
      if (top < 0) top = rect.bottom + 12
      if (left < 12) left = 12
      tooltipRef.current.style.top  = top  + 'px'
      tooltipRef.current.style.left = left + 'px'
    },
    hide() {
      if (tooltipRef.current) tooltipRef.current.classList.remove('show')
    },
  }

  const handleSelect = (room) => {
    if (room.booked) { alert('Sorry, this room is already booked!'); return }
    if (!readonly && onSelectRoom) onSelectRoom(room.id)
  }

  const fData = floors[activeFloor]

  const roomProps = (room) => ({
    room, capacityFilter, selectedRoom,
    onSelect: handleSelect, tooltip,
  })

  const isGround = activeFloor === 'ground'

  return (
    <div>
      {/* Capacity Filter */}
      <div className="capacity-filter-section">
        <label className="filter-label">Filter by Capacity:</label>
        <div className="capacity-filter-buttons">
          {['all','3','4'].map(v => (
            <button
              key={v}
              className={`capacity-filter-btn${capacityFilter === v ? ' active' : ''}`}
              onClick={() => setCapacityFilter(v)}
            >
              {v === 'all' ? 'All Rooms' : `${v}-Seater`}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Selector */}
      <div className="floor-selector">
        <label className="filter-label">Floors:</label>
        {['ground','1','2','3','4','5','6'].map(f => (
          <button
            key={f}
            className={`floor-btn${activeFloor === f ? ' active' : ''}`}
            onClick={() => setActiveFloor(f)}
          >
            {f === 'ground' ? 'G' : f}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="hostel-map-container">
        <div className="floor-map">
          <div className="floor-container">
            <div className="outer-building">

              {isGround ? (
                <>
                  <div className="top-left-rooms">
                    {fData.topLeftRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                  <div className="top-center-rooms">
                    {fData.topCenterRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                </>
              ) : (
                <>
                  <div className="left-rooms">
                    {fData.leftRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                  <div className="top-rooms">
                    {fData.topRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                  <div className="right-rooms">
                    {fData.rightRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                </>
              )}

              <div className="inner-building">
                <div className="inner-top-rooms" style={{ flexDirection:'row', justifyContent:'space-between', width:'100%' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {(isGround ? fData.innerTopRooms : fData.innerTopLeft).map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                  {!isGround && (
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-start' }}>
                      {fData.innerTopRight.map(r => <Room key={r.id} {...roomProps(r)} />)}
                    </div>
                  )}
                </div>
                <div className="inner-center" />
                <div className="inner-bottom-rooms" style={{ flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'flex-end' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {(isGround ? fData.innerBottomRooms : fData.innerBotLeft).map(r => <Room key={r.id} {...roomProps(r)} />)}
                  </div>
                  {!isGround && (
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
                      {fData.innerBotRight.map(r => <Room key={r.id} {...roomProps(r)} />)}
                    </div>
                  )}
                </div>
              </div>

              {!isGround && (
                <div className="bottom-rooms">
                  {fData.bottomRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                </div>
              )}
              {isGround && (
                <div className="bottom-rooms">
                  {fData.bottomRooms.map(r => <Room key={r.id} {...roomProps(r)} />)}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item"><div className="legend-color available"/><span>Available</span></div>
          <div className="legend-item"><div className="legend-color booked"/><span>Booked</span></div>
          {!readonly && <div className="legend-item"><div className="legend-color selected"/><span>Your Selection</span></div>}
        </div>
      </div>

      {/* Tooltip */}
      <div className="room-tooltip" ref={tooltipRef} />
    </div>
  )
}
