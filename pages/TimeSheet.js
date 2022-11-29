/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const moment = require('moment');

export default function TimeSheet() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const [allEntries, setAllEntries] = useState([])
  const [date, setDate] = useState(new Date());
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
    
    const getData = async () => {
      if (!userEmail || !formatedDate)
        return
      await fetch(`api/day/${userEmail}/${formatedDate}`, { method: 'GET' })
        .then(response => response.json())
        .then(timesheetData => {
           setAllEntries(timesheetData.allEntries)
           setTotalTime(timesheetData.totalTime)
          }
        )
      }
    getData();
  }, [date, userEmail, totalTime]);
  
  return (
    <section className="timesheet-page">
      <Header />
      <section className="timesheet-container">
        <h2>Timesheet</h2>
        <div className="info-container">
           Name  : {userName}<br></br>
           Email : {userEmail}
        </div><br></br>
        Filter By Date:
        <DatePicker
          value={date}
          selected={date}
          onChange={date => setDate(date)}
        />
        <div className='total-time'>
           Total Time  : {new Date(totalTime * 1000).toISOString().slice(11, 19)}
        </div>
      </section>
      <section className="timesheet-table">
        <ul className="start-time-list">
          Start Time
          { allEntries?.map(entry => {
            return(
              <li className="time-card" key={entry._id}>
                {entry.startTime}
              </li>
             )    
            })
          }
        </ul>
        <ul className="end-time-list">
          End Time
          { allEntries?.map(entry => {
            return(
              <li className="time-card" key={entry._id}>
                {entry.endTime}
              </li>
             )    
            })
          }
        </ul>
        <ul className="duration-list">
          Duration
          { allEntries?.map(entry => {
            return(
              <li className="time-card" key={entry._id}>
                {new Date(entry.duration * 1000).toISOString().slice(11, 19)}
              </li>
             )    
            })
          }
        </ul>
      </section>
      <Footer />
    </section>
  )
}
