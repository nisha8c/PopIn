import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'

export default function TimeSheet() {
  const { data: session } = useSession()
  const userId = session?.user?.id;

  const [allEntries, setAllEntries] = useState([])

  useEffect(() => {
    fetch(`api/entries/${userId}`, { 
      method: 'GET',
    })
      .then(response => response.json())
      .then(allEntries => setAllEntries(allEntries.allUsersEntries));
  }, [])
  
  return (
    <>
      <Header />
      <section className="timesheet-container">
      <h2>Timesheet</h2>
        This is Timesheet....
        <ul>
          {
            allEntries.map(entry => (
              <li key={entry._id}>
                START: {entry.startTime}<br></br>
                END: {entry.endTime}<br></br><br></br>
              </li>
            ))
          }
        </ul>
      </section>
      <Footer />
    </>
  )
}
