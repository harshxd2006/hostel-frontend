import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RequestContext = createContext(null)

export const CURRENT_USER = { name: 'Anshu Kumar', roll: '22BCS045' }
const STORAGE_KEY = 'nith_hostel_requests'

function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
    catch { return [] }
}
function save(reqs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reqs))
}

export function RequestProvider({ children }) {
    const [requests, setRequests] = useState(load)

    const sync = useCallback(() => setRequests(load()), [])

    useEffect(() => {
        const iv = setInterval(sync, 2000)
        window.addEventListener('storage', sync)
        return () => { clearInterval(iv); window.removeEventListener('storage', sync) }
    }, [sync])

    const sendRequest = (from, room, roommateEntry) => {
        const now = new Date()
        const newReq = {
            id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            from,
            room,
            to: { roll: roommateEntry.roll.trim(), name: roommateEntry.name.trim() },
            status: 'pending',
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: now.toLocaleDateString(),
        }
        const updated = [...load(), newReq]
        save(updated)
        setRequests(updated)
        return newReq
    }

    const respondToRequest = (id, response) => {
        const updated = load().map(r => r.id === id ? { ...r, status: response } : r)
        save(updated)
        setRequests(updated)
    }

    const outgoingRequests = requests.filter(r => r.from.roll === CURRENT_USER.roll)
    const incomingRequests = requests.filter(r => r.to.roll.toLowerCase() === CURRENT_USER.roll.toLowerCase())
    const pendingCount = incomingRequests.filter(r => r.status === 'pending').length

    return (
        <RequestContext.Provider value={{ requests, sendRequest, respondToRequest, incomingRequests, outgoingRequests, pendingCount }}>
            {children}
        </RequestContext.Provider>
    )
}

export function useRequests() { return useContext(RequestContext) }