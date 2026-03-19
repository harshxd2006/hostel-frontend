import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const allStudents = [
  { batch: 'A', time: '10:30 - 11:00', students: [
    { rank:1,  name:'Anshu',     roll:'25',  cgpi:8.7, status:'allotted' },
    { rank:2,  name:'Harsh',     roll:'19',  cgpi:8.5, status:'missed'   },
    { rank:3,  name:'Priya',     roll:'42',  cgpi:8.4, status:'allotted' },
    { rank:4,  name:'Rahul',     roll:'33',  cgpi:8.3, status:'pending'  },
    { rank:5,  name:'Neha',      roll:'17',  cgpi:8.2, status:'allotted' },
    { rank:6,  name:'Vikram',    roll:'28',  cgpi:8.1, status:'pending'  },
    { rank:7,  name:'Sneha',     roll:'45',  cgpi:8.0, status:'allotted' },
    { rank:8,  name:'Karan',     roll:'12',  cgpi:7.9, status:'missed'   },
    { rank:9,  name:'Pooja',     roll:'38',  cgpi:7.8, status:'allotted' },
    { rank:10, name:'Arjun',     roll:'22',  cgpi:7.7, status:'pending'  },
    { rank:11, name:'Aditi',     roll:'50',  cgpi:7.6, status:'allotted' },
    { rank:12, name:'Ravi',      roll:'31',  cgpi:7.5, status:'pending'  },
    { rank:13, name:'Simran',    roll:'44',  cgpi:7.4, status:'allotted' },
    { rank:14, name:'Rohan',     roll:'18',  cgpi:7.3, status:'missed'   },
    { rank:15, name:'Ananya',    roll:'27',  cgpi:7.2, status:'allotted' },
    { rank:16, name:'Ishaan',    roll:'36',  cgpi:7.1, status:'pending'  },
    { rank:17, name:'Diya',      roll:'49',  cgpi:7.0, status:'allotted' },
    { rank:18, name:'Kunal',     roll:'14',  cgpi:6.9, status:'missed'   },
    { rank:19, name:'Meera',     roll:'40',  cgpi:6.8, status:'allotted' },
    { rank:20, name:'Sahil',     roll:'23',  cgpi:6.7, status:'pending'  },
    { rank:21, name:'Riya',      roll:'47',  cgpi:6.6, status:'allotted' },
    { rank:22, name:'Ayush',     roll:'11',  cgpi:6.5, status:'missed'   },
    { rank:23, name:'Tanvi',     roll:'35',  cgpi:6.4, status:'allotted' },
    { rank:24, name:'Siddharth', roll:'29',  cgpi:6.3, status:'pending'  },
    { rank:25, name:'Laksh',     roll:'21',  cgpi:8.4, status:'allotted' },
  ]},
  { batch: 'B', time: '11:00 - 11:30', students: [
    { rank:26, name:'Kavya',   roll:'43', cgpi:6.2, status:'allotted' },
    { rank:27, name:'Nikhil',  roll:'16', cgpi:6.1, status:'missed'   },
    { rank:28, name:'Anika',   roll:'39', cgpi:6.0, status:'allotted' },
    { rank:29, name:'Yash',    roll:'26', cgpi:5.9, status:'pending'  },
    { rank:30, name:'Divya',   roll:'48', cgpi:5.8, status:'allotted' },
    { rank:31, name:'Aman',    roll:'13', cgpi:5.7, status:'pending'  },
    { rank:32, name:'Shruti',  roll:'41', cgpi:5.6, status:'allotted' },
    { rank:33, name:'Varun',   roll:'24', cgpi:5.5, status:'missed'   },
    { rank:34, name:'Nisha',   roll:'37', cgpi:5.4, status:'allotted' },
    { rank:35, name:'Akash',   roll:'15', cgpi:5.3, status:'pending'  },
    { rank:36, name:'Tanya',   roll:'46', cgpi:5.2, status:'allotted' },
    { rank:37, name:'Rohit',   roll:'20', cgpi:5.1, status:'missed'   },
    { rank:38, name:'Kiara',   roll:'32', cgpi:5.0, status:'allotted' },
    { rank:39, name:'Aryan',   roll:'10', cgpi:4.9, status:'pending'  },
    { rank:40, name:'Zara',    roll:'34', cgpi:4.8, status:'allotted' },
    { rank:41, name:'Dev',     roll:'30', cgpi:4.7, status:'pending'  },
    { rank:42, name:'Sara',    roll:'51', cgpi:4.6, status:'allotted' },
    { rank:43, name:'Rishabh', roll:'09', cgpi:4.5, status:'missed'   },
    { rank:44, name:'Isha',    roll:'52', cgpi:4.4, status:'allotted' },
    { rank:45, name:'Pranav',  roll:'08', cgpi:4.3, status:'pending'  },
    { rank:46, name:'Muskan',  roll:'53', cgpi:4.2, status:'allotted' },
    { rank:47, name:'Vivek',   roll:'07', cgpi:4.1, status:'missed'   },
    { rank:48, name:'Anjali',  roll:'54', cgpi:4.0, status:'allotted' },
    { rank:49, name:'Karthik', roll:'06', cgpi:3.9, status:'pending'  },
    { rank:50, name:'Pallavi', roll:'55', cgpi:3.8, status:'allotted' },
  ]},
  { batch: 'C', time: '11:30 - 12:00', students: [
    { rank:51, name:'Mohit',    roll:'05', cgpi:3.7, status:'pending'  },
    { rank:52, name:'Navya',    roll:'56', cgpi:3.6, status:'allotted' },
    { rank:53, name:'Aditya',   roll:'04', cgpi:3.5, status:'missed'   },
    { rank:54, name:'Sakshi',   roll:'57', cgpi:3.4, status:'allotted' },
    { rank:55, name:'Manish',   roll:'03', cgpi:3.3, status:'pending'  },
    { rank:56, name:'Deepika',  roll:'58', cgpi:3.2, status:'allotted' },
    { rank:57, name:'Saurabh',  roll:'02', cgpi:3.1, status:'missed'   },
    { rank:58, name:'Ritika',   roll:'59', cgpi:3.0, status:'allotted' },
    { rank:59, name:'Gaurav',   roll:'01', cgpi:2.9, status:'pending'  },
    { rank:60, name:'Preeti',   roll:'60', cgpi:2.8, status:'allotted' },
    { rank:61, name:'Rajat',    roll:'61', cgpi:2.7, status:'pending'  },
    { rank:62, name:'Swati',    roll:'62', cgpi:2.6, status:'allotted' },
    { rank:63, name:'Dhruv',    roll:'63', cgpi:2.5, status:'missed'   },
    { rank:64, name:'Nikita',   roll:'64', cgpi:2.4, status:'allotted' },
    { rank:65, name:'Shubham',  roll:'65', cgpi:2.3, status:'pending'  },
    { rank:66, name:'Jyoti',    roll:'66', cgpi:2.2, status:'allotted' },
    { rank:67, name:'Abhishek', roll:'67', cgpi:2.1, status:'missed'   },
    { rank:68, name:'Komal',    roll:'68', cgpi:2.0, status:'allotted' },
    { rank:69, name:'Pankaj',   roll:'69', cgpi:1.9, status:'pending'  },
    { rank:70, name:'Megha',    roll:'70', cgpi:1.8, status:'allotted' },
    { rank:71, name:'Sumit',    roll:'71', cgpi:1.7, status:'pending'  },
    { rank:72, name:'Payal',    roll:'72', cgpi:1.6, status:'allotted' },
    { rank:73, name:'Tarun',    roll:'73', cgpi:1.5, status:'missed'   },
    { rank:74, name:'Seema',    roll:'74', cgpi:1.4, status:'allotted' },
    { rank:75, name:'Nitin',    roll:'75', cgpi:1.3, status:'pending'  },
  ]},
]

export default function Homepage() {
  const [search, setSearch] = useState('')

  const q = search.toLowerCase().trim()

  const filteredBatches = allStudents.map(b => ({
    ...b,
    students: b.students.filter(
      s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q)
    ),
  }))

  const anyResults = filteredBatches.some(b => b.students.length > 0)

  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          <div className="content-section">
            <h2 className="section-title">Dashboard</h2>

            {/* Your Batch */}
            <div className="batch-info-card">
              <table className="batch-table">
                <thead><tr><th>YOUR BATCH</th><th>TIME SLOT</th><th>RANGE</th></tr></thead>
                <tbody><tr><td>Batch D</td><td>12:00 - 12:30</td><td>50 - 75</td></tr></tbody>
              </table>
            </div>

            {/* Current Batch */}
            <h3 style={{ marginTop:30, marginBottom:15, fontSize:18, color:'#333', fontWeight:600 }}>Current Batch:</h3>
            <div className="batch-info-card" style={{ marginBottom:20 }}>
              <table className="batch-table">
                <thead><tr><th>BATCH</th><th>TIME SLOT</th><th>RANGE</th></tr></thead>
                <tbody><tr><td>Batch B</td><td>10:00 - 10:30</td><td>346 - 400</td></tr></tbody>
              </table>
            </div>

            {/* Upcoming Batch */}
            <h3 style={{ marginTop:30, marginBottom:15, fontSize:18, color:'#333', fontWeight:600 }}>Upcoming NEXT Batch:</h3>
            <div className="batch-info-card" style={{ marginBottom:30 }}>
              <table className="batch-table">
                <thead><tr><th>BATCH</th><th>TIME SLOT</th><th>RANGE</th></tr></thead>
                <tbody><tr><td>Batch C</td><td>10:30 - 11:00</td><td>401 - 425</td></tr></tbody>
              </table>
            </div>

            {/* Stats */}
            <div style={{ display:'flex', justifyContent:'space-between', gap:20, fontSize:16, color:'#000', fontWeight:400 }}>
              <div style={{ background:'#fff', border:'1px solid #ddd', padding:20, borderRadius:12, flex:1, boxShadow:'0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom:12 }}><span style={{ fontWeight:600 }}>Total students :</span> 650</div>
                <div style={{ marginBottom:12 }}><span style={{ fontWeight:600 }}>Alloted :</span> 487</div>
                <div><span style={{ fontWeight:600 }}>remaining students :</span> 163</div>
              </div>
              <div style={{ background:'#fff', border:'1px solid #ddd', padding:20, borderRadius:12, flex:1, boxShadow:'0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom:12 }}><span style={{ fontWeight:600 }}>Total Rooms :</span> 130</div>
                <div style={{ marginBottom:12 }}><span style={{ fontWeight:600 }}>(F) Alloted :</span> 10</div>
                <div style={{ marginBottom:12 }}><span style={{ fontWeight:600 }}>(P) Alloted :</span> 2</div>
                <div><span style={{ fontWeight:600 }}>Remain :</span> 118</div>
              </div>
            </div>

            {/* Search */}
            <div className="search-section">
              <div className="search-bar-container">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search by Name or Roll Number..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <span className="search-icon">🔍</span>
                {search && (
                  <span
                    className="clear-icon"
                    style={{ display:'block' }}
                    onClick={() => setSearch('')}
                  >&times;</span>
                )}
              </div>
            </div>

            {/* Students Table */}
            <div className="students-table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Rank</th><th>Name</th><th>Roll No</th><th>CGPI</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((batch, bi) => (
                    batch.students.length > 0 && (
                      <>
                        <tr key={`divider-${bi}`} className="batch-divider">
                          <td colSpan={5}>
                            <div className="batch-info-row">
                              <span className="batch-label">Batch {batch.batch}</span>
                              <span className="batch-time">{batch.time}</span>
                            </div>
                          </td>
                        </tr>
                        {batch.students.map(s => (
                          <tr key={s.rank}>
                            <td>{s.rank}</td>
                            <td>{s.name}</td>
                            <td>{s.roll}</td>
                            <td>{s.cgpi}</td>
                            <td><span className={`status-badge ${s.status}`}>{s.status}</span></td>
                          </tr>
                        ))}
                        {bi < filteredBatches.length - 1 && (
                          <tr key={`gap-${bi}`} className="batch-gap"><td colSpan={5}></td></tr>
                        )}
                      </>
                    )
                  ))}
                  {!anyResults && (
                    <tr>
                      <td colSpan={5} style={{ textAlign:'center', padding:40, color:'#888' }}>
                        No students found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
