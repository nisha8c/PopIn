import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function TimeSheet() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const [allEntries, setAllEntries] = useState([])
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const userData = userEmail + date;
    fetch(`api/entries/${userData}`, { 
      method: 'GET',
    })
      .then(response => response.json())
      .then(allEntries => setAllEntries(allEntries.allTimeEntries))
  })
  
  return (
    <>
      <Header />
      <section className="timesheet-container">
      <h2>Timesheet</h2>
        This is Timesheet....
        <div className='info-container'>
           Name  : {userName}
           Email : {userEmail}
        </div>
        Filter By Date:
        <DatePicker
          value={date}
          selected={date}
          onChange={date => setDate(date)}
        />
      </section>
      <section className="timesheet-table">
        <ul className='time-list'>
          { allEntries.map((entry) => {
            return(
              <li className='time-card' key={entry._id}>
                {entry.startTime}
                {entry.endTime}
                {entry.duration}
              </li>
             )    
            })
          }
        </ul>
      </section>
      <Footer />
    </>
  )
}
