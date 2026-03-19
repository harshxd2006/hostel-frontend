import { useRequests, CURRENT_USER } from '../context/RequestContext'

const STATUS = {
    pending: { bg: '#fff3cd', color: '#856404', border: '#ffeeba', label: 'Pending' },
    accepted: { bg: '#d4edda', color: '#155724', border: '#c3e6cb', label: 'Accepted' },
    declined: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb', label: 'Declined' },
}

export default function PendingRequests() {
    const { incomingRequests } = useRequests()

    return (
        <div className="content-section">
            <h2 className="section-title">Pending Requests</h2>
            <p style={{ fontSize: 13, color: '#777', marginBottom: 24 }}>
                Roommate requests sent to you (<strong>{CURRENT_USER.roll}</strong>).
            </p>

            {incomingRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>No requests yet</div>
                    <div style={{ fontSize: 13, marginTop: 8 }}>
                        When someone sends you a roommate request, it will appear here.
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {incomingRequests.map(req => {
                        const s = STATUS[req.status]
                        const isPending = req.status === 'pending'
                        return (
                            <div key={req.id} style={{
                                border: `1px solid ${isPending ? '#2E6DA4' : s.border}`,
                                borderRadius: 10, padding: '18px 20px',
                                background: isPending ? '#f0f8ff' : s.bg,
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', flexWrap: 'wrap', gap: 12,
                                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                            }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 6 }}>
                                        🏠 Room <span style={{ color: '#2E6DA4' }}>{req.room}</span>
                                    </div>
                                    <div style={{ fontSize: 13, color: '#555', marginBottom: 3 }}>
                                        <span style={{ fontWeight: 600 }}>From:</span> {req.from.name}&nbsp;·&nbsp;
                                        <span style={{ color: '#2E6DA4', fontWeight: 500 }}>{req.from.roll}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#999', marginBottom: isPending ? 8 : 0 }}>
                                        {req.date} · {req.time}
                                    </div>
                                    {isPending && (
                                        <div style={{ fontSize: 12, color: '#856404', background: '#fff8e1', display: 'inline-block', padding: '3px 10px', borderRadius: 20, border: '1px solid #ffe082' }}>
                                            ⏳ Check your email to respond
                                        </div>
                                    )}
                                </div>
                                <span style={{
                                    padding: '6px 18px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: 0.5,
                                    background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                }}>
                                    {s.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}