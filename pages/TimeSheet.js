/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'

export default function TimeSheet() {
  const { data: session } = useSession()
  let userId = session?.user?.id
  const [allEntries, setAllEntries] = useState([])

  useEffect(() => {
    if (!userId) {
      userId = JSON.parse(localStorage.getItem('userId'))
    }
    fetch(`api/entries/${userId}`, { 
      method: 'GET',
    })
      .then(response => response.json())
      .then(allEntries => setAllEntries(allEntries.allUsersEntries));
  }, [])

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));
  }, []);

  
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
