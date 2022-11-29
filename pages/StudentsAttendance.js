import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css'
const moment = require('moment');

export default function StudentsAttendance() {

  const [allEntries, setAllEntries] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [date, setDate] = useState(new Date());
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const formatedDate = moment(date).format('YYYY-MM-DD')

    const getusers = async () => {
      await fetch(`api/entries`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
          setAllUsers(result.allUsersList)
        })
      }
      getusers();
      
     const getData = async () => {
      await fetch(`api/day/${selectedEmail}/${formatedDate}`, { method: 'GET' })
        .then(response => response.json())
        .then(timesheetData => {
           setAllEntries(timesheetData.allEntries)
           setTotalTime(timesheetData.totalTime)
          }
        )
      }
    getData();
  }, [date,selectedEmail]);

  const handleCategoryChange = event => {
    setSelectedEmail(event.value);
  };

  const deleteTimesheet = async () => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
    await fetch(`api/day/${selectedEmail}/${formatedDate}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(message => console.log(message)) 
  };

  const deleteEntry = async (entryid) => {
    fetch(`api/entries/${entryid}`, { method: 'DELETE' } )
      .then(response => response.json())
      .then(message => console.log(message))
  };

  return (
    <>
      <Header />
      <section className="timesheet-container">
        <h2>View All Attendance</h2>
        <section className='filter-container'>
          Filter by Email:  
          <Dropdown
            options={allUsers}
            onChange={handleCategoryChange}
            value={selectedEmail}
            placeholder="Select Email"
          />    
          <br></br><br></br>
          Filter By Date:
          <DatePicker
            value={date}
            selected={date}
            onChange={date => setDate(date)}
          />
          <button onClick={() => deleteTimesheet()}>Delete Entries for whole day</button>
        </section> <hr />
        <div className='total-time'>
           Total Time  : {new Date(totalTime * 1000).toISOString().slice(11, 19)}
        </div>
      </section>
      <section className="timesheet-table">
        <ul className='start-time-list'>
          Start Time
          { allEntries?.map(entry => {
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
          { allEntries?.map(entry => {
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
          { allEntries?.map(entry => {
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
          { allEntries?.map(entry => {
            return(
              <li className='delete-card' key={entry._id}>
                <button className='delete-time-entry-btn' onClick={() => deleteEntry(entry._id)}>Delete</button>
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
