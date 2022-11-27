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
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const formatData = (input) => {
      if (input > '9') {
        return input;
      } else return `0${input}`;
    };
    const formatedDate = date.getFullYear() + '-' + formatData(date.getMonth()+1) + '-' + formatData(date.getDate());
    const userData = userEmail + '^' + formatedDate;
    
    const getData = async () => {
      await fetch(`api/entries/${userData}`, { method: 'GET' })
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
        <div className='total-time'>
           Total Time  : {totalTime}
        </div>
      </section>
      <section className="timesheet-table">
        <ul className='start-time-list'>
          Start Time
          { allEntries.map(entry => {
            return(
              <li className='time-card' key={entry._id}>
                {entry.startTime}
              </li>
             )    
            })
          }
        </ul>
        <ul className='end-time-list'>
          End Time
          { allEntries.map(entry => {
            return(
              <li className='time-card' key={entry._id}>
                {entry.endTime}
              </li>
             )    
            })
          }
        </ul>
        <ul className='duration-list'>
          Duration
          { allEntries.map(entry => {
            return(
              <li className='time-card' key={entry._id}>
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
