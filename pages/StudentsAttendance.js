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
  const [dataFound, setdataFound] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
  
    const getData = async () => {
      if (!selectedEmail && !refresh)
        return      
      await fetch(`api/day/${selectedEmail}/${formatedDate}`, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw Error('Entries not found')
            }
            return response.json()
          }).then(timesheetData => {
              setdataFound(true)
              setAllEntries(timesheetData.allEntries)
              setTotalTime(timesheetData.totalTime)
          }
        ).catch(error => {
          setdataFound(false)
          console.log(error)
        })
      }
    getData();

    const getusers = async () => {
      await fetch(`api/entries`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
          setAllUsers(result.allUsersList)
        })
      }
    getusers();
    setRefresh(false);
  }, [date, selectedEmail, dataFound, refresh]);

  const handleCategoryChange = event => {
    setSelectedEmail(event.value);
  };

  const deleteTimesheet = async () => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
    await fetch(`api/day/${selectedEmail}/${formatedDate}`, { method: 'DELETE' })
      .then(message => console.log('Timesheet deleted sucessfully')) 
    setRefresh(true);
  };

  const deleteEntry = async (entryid) => {
    fetch(`api/entries/${entryid}`, { method: 'DELETE' } )
      .then(message => console.log('Entry deleted sucessfully'));
    setRefresh(true);
  };

  const NoData = () => {
    return(
      <>
        <p className='noData'> No records found for this date </p>
      </>
    );
  };

  const ShowData = () => {
    return(  
      <section className="timesheet-table-all">
        <div className='total-time'>
           Total Time  : {new Date(totalTime * 1000).toISOString().slice(11, 19)}
        </div>
        <table className="timesheet-table_table">
          <thead className="timesheet-table_head">
            <tr>
              <th className="table-title">Start Time</th>
              <th className="table-title">End Time</th>
              <th className="table-title">Duration</th>
              <th className="table-title"></th>
            </tr>
          </thead>
          <tbody>
          {
            allEntries?.map(entry => {
            return (
              <tr key={entry._id}>
                <td>{moment(entry.startTime).format('HH:mm:ss')}</td>
                <td>{moment(entry.endTime).format('HH:mm:ss') === `01:00:00` ? `--:--` : moment(entry.endTime).format('HH:mm:ss')}</td>
                <td>{new Date(entry.duration * 1000).toISOString().slice(11, 19)}</td>
                <td><button className='delete-time-entry-btn' onClick={() => deleteEntry(entry._id)}>Delete</button></td>
              </tr>
            )})
          }
          </tbody>
        </table>
      </section>
    );
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
            className="filter-by-email"
          />    
          <br></br>
          <button className="deleteAllBtn" onClick={() => deleteTimesheet()}>Delete entries for the whole day</button><br/><br/>
          Filter By Date:
          <DatePicker
            value={date}
            selected={date}
            onChange={date => setDate(date)}
          />
        </section> <hr />
      </section>
      { dataFound ? <ShowData /> : <NoData /> }
      <Footer />
    </>
  )
}
