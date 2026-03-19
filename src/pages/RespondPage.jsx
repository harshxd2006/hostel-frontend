import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useRequests } from '../context/RequestContext'

export default function RespondPage() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const { respondToRequest, requests } = useRequests()

    const id = params.get('id')
    const action = params.get('action')
    const valid = ['accepted', 'declined'].includes(action)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!id || !valid) return
        const t = setTimeout(() => { respondToRequest(id, action); setDone(true) }, 400)
        return () => clearTimeout(t)
    }, []) // eslint-disable-line

    const req = requests.find(r => r.id === id)
    const isAccept = action === 'accepted'
    const accent = isAccept ? '#2E6DA4' : '#7B1A1A'

    if (!id || !valid) return (
        <div style={page}>
            <div style={card}>
                <Header />
                <div style={{ textAlign: 'center', padding: '8px 0 20px' }}>
                    <div style={iconCircle('#7B1A1A')}>
                        <span style={iconText}>✕</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#7B1A1A', marginBottom: 8 }}>Invalid Link</div>
                    <div style={{ fontSize: 13, color: '#999', marginBottom: 28 }}>This link is invalid or has already been used.</div>
                    <button onClick={() => navigate('/')} style={btnFull('#2E6DA4')}>Go to Portal</button>
                </div>
            </div>
        </div>
    )

    return (
        <div style={page}>
            <style>{`
        @media (max-width: 500px) {
          .respond-card { padding: 0 0 24px !important; max-width: 100% !important; border-radius: 0 !important; min-height: 100vh; }
          .respond-body { padding: 20px 16px !important; }
        }
      `}</style>

            <div className="respond-card" style={card}>
                <Header />
                <div className="respond-body" style={{ padding: '24px 28px 8px', textAlign: 'center' }}>
                    {!done ? (
                        <div style={{ padding: '20px 0' }}>
                            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid #ccc', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 20, height: 20, border: '3px solid #2E6DA4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            </div>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            <div style={{ fontSize: 15, color: '#666' }}>Processing your response…</div>
                        </div>
                    ) : (
                        <>
                            {/* Status icon */}
                            <div style={{ margin: '8px 0 16px' }}>
                                <div style={iconCircle(accent)}>
                                    <span style={iconText}>{isAccept ? '✓' : '✕'}</span>
                                </div>
                            </div>

                            <div style={{ fontSize: 20, fontWeight: 800, color: accent, marginBottom: 20 }}>
                                {isAccept ? 'Request Accepted' : 'Request Declined'}
                            </div>

                            {/* Info box */}
                            {req && (
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${accent}`, borderRadius: 8, padding: '14px 18px', marginBottom: 20, textAlign: 'left' }}>
                                    {[
                                        ['Room', req.room || 'Not specified'],
                                        ['Requested by', `${req.from.name} (${req.from.roll})`],
                                        ['Your roll', req.to.roll],
                                    ].map(([label, value]) => (
                                        <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 14, flexWrap: 'wrap' }}>
                                            <span style={{ color: '#94a3b8', fontWeight: 500, minWidth: 110, flexShrink: 0 }}>{label}</span>
                                            <span style={{ fontWeight: 600, color: '#1e293b' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24, lineHeight: 1.7 }}>
                                {isAccept
                                    ? 'Your acceptance has been recorded. The room leader has been notified on the portal.'
                                    : 'Your response has been recorded. You can still be selected for another room.'}
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                style={btnFull(accent)}
                                onMouseOver={e => e.target.style.opacity = '0.88'}
                                onMouseOut={e => e.target.style.opacity = '1'}
                            >
                                Back to Portal
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function Header() {
    return (
        <div style={{ background: '#7B1A1A', padding: '16px 24px', borderRadius: '10px 10px 0 0', textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>NIT HAMIRPUR</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>Hostel Allotment Portal 2026</div>
        </div>
    )
}

const iconCircle = (bg) => ({
    width: 64, height: 64, borderRadius: '50%',
    background: bg, display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 4px 16px ${bg}55`,
})

const iconText = {
    color: 'white', fontSize: 26, fontWeight: 700, lineHeight: 1,
}

const btnFull = (bg) => ({
    width: '100%', background: bg, color: 'white',
    border: 'none', padding: '13px', borderRadius: 8,
    fontSize: 15, fontWeight: 700, cursor: 'pointer',
    transition: 'opacity 0.2s', letterSpacing: 0.3,
})

const page = {
    minHeight: '100vh',
    background: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: 20,
}

const card = {
    background: 'white',
    borderRadius: 12,
    maxWidth: 460,
    width: '100%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
}