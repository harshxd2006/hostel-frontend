import { useSearchParams, useNavigate } from 'react-router-dom'
import { useRequests } from '../context/RequestContext'

export default function SimulatedEmail() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const { requests } = useRequests()

    const id = params.get('id')
    const req = requests.find(r => r.id === id)

    const handleAction = (action) => navigate(`/respond?id=${id}&action=${action}`)

    if (!req) return (
        <div style={page}>
            <div style={{ background: 'white', padding: '48px 32px', borderRadius: 12, maxWidth: 400, width: '100%', margin: '40px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#7B1A1A', marginBottom: 8 }}>Email Not Found</div>
                <div style={{ fontSize: 13, color: '#999' }}>This link may be invalid or expired.</div>
            </div>
        </div>
    )

    return (
        <div style={page}>
            <style>{`
        .sim-wrap { width: 100%; max-width: 860px; }
        .sim-chrome { background: #1e293b; padding: 10px 18px; border-radius: 10px 10px 0 0; display: flex; align-items: center; gap: 8px; }
        .sim-header { background: #7B1A1A; padding: 18px 32px; display: flex; align-items: center; gap: 16px; }
        .sim-subject { background: #2E6DA4; padding: 11px 32px; }
        .sim-body { padding: 28px 32px 0; }
        .sim-footer { margin: 20px 32px 0; border-top: 1px solid #f1f5f9; padding: 16px 0 28px; }
        .sim-btn-row { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
        .sim-info-row { display: flex; gap: 16px; margin-bottom: 8px; font-size: 14px; align-items: flex-start; }
        @media (max-width: 600px) {
          .sim-header { padding: 14px 16px; }
          .sim-subject { padding: 10px 16px; }
          .sim-body { padding: 20px 16px 0; }
          .sim-footer { margin: 16px 16px 0; padding: 14px 0 20px; }
          .sim-btn-row { flex-direction: column; }
          .sim-btn-row button { width: 100% !important; }
          .sim-info-row { flex-direction: column; gap: 2px; }
          .sim-info-label { min-width: unset !important; }
        }
      `}</style>

            <div className="sim-wrap">
                {/* Chrome bar */}
                <div className="sim-chrome">
                    {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                        <span key={c} style={{ display: 'inline-block', width: 13, height: 13, borderRadius: '50%', background: c }} />
                    ))}
                    <span style={{ marginLeft: 10, color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>NIT Hamirpur Mail — Inbox</span>
                </div>

                <div style={{ background: 'white', borderRadius: '0 0 12px 12px', boxShadow: '0 6px 24px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
                    {/* Maroon sender header */}
                    <div className="sim-header">
                        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                            {req.from.name[0]}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>
                                {req.from.name}
                                <span style={{ fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginLeft: 8 }}>
                                    &lt;{req.from.roll.toLowerCase()}@nith.ac.in&gt;
                                </span>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 }}>To: {req.to.roll.toLowerCase()}@nith.ac.in</div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 2 }}>{req.date} · {req.time}</div>
                        </div>
                    </div>

                    {/* Blue subject */}
                    <div className="sim-subject">
                        <div style={{ color: 'white', fontWeight: 600, fontSize: 14, letterSpacing: 0.2 }}>
                            [NITH Hostel] Roommate Request for Room {req.room}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="sim-body">
                        <p style={{ fontSize: 15, color: '#1e293b', marginBottom: 16 }}>
                            Dear <strong>{req.to.name || req.to.roll}</strong>,
                        </p>
                        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.75, marginBottom: 22 }}>
                            <strong style={{ color: '#1e293b' }}>{req.from.name}</strong>
                            <span style={{ color: '#2E6DA4', fontSize: 13, marginLeft: 4 }}>({req.from.roll})</span>
                            {' '}has sent you a <strong>roommate request</strong> for the following room at{' '}
                            <strong>Himadri Boys Hostel, NIT Hamirpur</strong>:
                        </p>

                        {/* Info box */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #7B1A1A', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
                            {[
                                ['Room', req.room || 'Not specified'],
                                ['Requested by', `${req.from.name} (${req.from.roll})`],
                                ['Sent at', `${req.time}, ${req.date}`],
                            ].map(([label, value]) => (
                                <div key={label} className="sim-info-row">
                                    <span className="sim-info-label" style={{ color: '#94a3b8', fontWeight: 500, minWidth: 120, flexShrink: 0 }}>{label}</span>
                                    <span style={{ color: '#1e293b', fontWeight: 600 }}>{value}</span>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 24 }}>
                            Please respond to this request using the buttons below:
                        </p>

                        {/* CTA buttons */}
                        <div className="sim-btn-row">
                            <button
                                onClick={() => handleAction('accepted')}
                                style={{ background: '#2E6DA4', color: 'white', border: 'none', padding: '13px 40px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', letterSpacing: 0.2 }}
                                onMouseOver={e => e.currentTarget.style.background = '#1d5a8a'}
                                onMouseOut={e => e.currentTarget.style.background = '#2E6DA4'}
                            >
                                Accept Request
                            </button>
                            <button
                                onClick={() => handleAction('declined')}
                                style={{ background: 'white', color: '#7B1A1A', border: '2px solid #7B1A1A', padding: '13px 40px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: 0.2 }}
                                onMouseOver={e => { e.currentTarget.style.background = '#7B1A1A'; e.currentTarget.style.color = 'white' }}
                                onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#7B1A1A' }}
                            >
                                Decline Request
                            </button>
                        </div>

                        <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7, paddingBottom: 4 }}>
                            If the buttons don't work, visit the portal at{' '}
                            <span style={{ color: '#2E6DA4', fontWeight: 500 }}>hostel.nith.ac.in</span>
                            {' '}and respond from your Pending Requests page.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="sim-footer">
                        <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
                            This is an automated message from the{' '}
                            <strong style={{ color: '#555' }}>NIT Hamirpur Hostel Allotment Portal 2026</strong>.
                            {' '}Please do not reply to this email. For help, contact the hostel administration.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const page = {
    minHeight: '100vh',
    background: '#f0f2f5',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 40,
}