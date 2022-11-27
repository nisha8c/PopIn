import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');

export default function StudentsAttendance() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const [allEntries, setAllEntries] = useState([])
  const [date, setDate] = useState(new Date());
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
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

  const deleteTimesheet = () => {

  };

  const deleteEntry = () => {
    
  };
  
  return (
    <>
      <Header />
      <section className="timesheet-container">
        <h2>View Students Attendance</h2>
      
        <section className='filter-container'>

          Filter by Student-Email:    
          <select>
            <option>1</option>
            <option>2</option>
          </select>
          <br></br><br></br>

          Filter By Date:
          <DatePicker
            value={date}
            selected={date}
            onChange={date => setDate(date)}
          />

          <button onClick={deleteTimesheet}>Delete Entries for whole day</button>
          
        </section> <hr />

        <div className='total-time'>
           Total Time  : {new Date(totalTime * 1000).toISOString().slice(11, 19)}
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
                {new Date(entry.duration * 1000).toISOString().slice(11, 19)}
              </li>
             )    
            })
          }
        </ul>

        <ul className='delete-list'>
          Delete Attendance Entry
          { allEntries.map(entry => {
            return(
              <li className='delete-card' key={entry._id}>
                <button className='delete-time-entry-btn' onClick={deleteEntry}>Delete</button>
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
