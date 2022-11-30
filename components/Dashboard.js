import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
const moment = require('moment');
import Link from 'next/link';
import { BsClock, BsClockFill } from "react-icons/bs";

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(Date.now());
  const [attendanceButton, setAttendanceButton] = useState(false);
  const [documentid, setDocumentId] = useState(null)
  const [entryid, setEntryId] = useState(null)
  const [clockIn, setClockIn] = useState('--:--');
  const [clockOut, setClockOut] = useState('--:--');

  useEffect(() => {
    const attendanceButton = JSON.parse(localStorage.getItem('attendanceButton'));
    if (attendanceButton) {
      setAttendanceButton(attendanceButton);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clockIn',  JSON.stringify(clockIn))
  }, [clockIn])

  useEffect(() => {
    localStorage.setItem('attendanceButton', JSON.stringify(attendanceButton));
  }, [attendanceButton]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const current = new Date();
  const currentDate = moment(current).format('YYYY-MM-DD');
  
  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = weekday[current.getDay()];
  const date = `${current.getDate()}`;

  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = month[current.getMonth()];

  const toggleInOutButton = () => setAttendanceButton(() => !attendanceButton)

  const handleInBtn = () => {
    fetch('api/entries', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
        timesheetDate: `${currentDate}`,
        startTime: `${current}`
      }),
    })
      .then(response => response.json())
      .then(newEntry => {
        setDocumentId(() => newEntry.documentId)
        setEntryId(() => newEntry.entryId)
         const displayInTime = moment(newEntry.entry.startTime).format('HH:mm')
        setClockIn(displayInTime)
      });
    toggleInOutButton()
  }

  const handleOutBtn = () => {
    fetch(`api/entries/${entryid}`, {
      method: 'PATCH',
      body: JSON.stringify({
        documentid: documentid,
        entryid: entryid,
        endTime: `${current}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(newEntry => {
        const displayOutTime =  moment(newEntry.entry.startTime).format('HH:mm')
        setClockOut(displayOutTime)
        setDocumentId(() => newEntry.documentId)
        setEntryId(() => newEntry.entryId)
      });
    toggleInOutButton()
  }

  const getButton = status => {
    return (
      status ? 
      <button onClick={handleOutBtn} className="myButtOut">OUT</button>
      :
      <button onClick={handleInBtn} className="myButtIn">IN</button>
    )
  }
        
  return (
    <div className="dashboard">
     <h2 className="dashboard-clock">{moment(time).format('hh:mm:ss A')}</h2> 
      <h4 className="dashboard-calendar">{day}, {monthName} {date}</h4>

      { getButton(attendanceButton) }
      
      <section className="clockIn-details_container">
        <div className="clock">
          <BsClock className="clock-icon" />
          <p className="clock-content"> { clockIn } </p>
          <p className="clock-content"> Clock In </p>
        </div>
        <div className="clock">
          <BsClockFill className="clock-icon" />
          <p className="clock-content"> { clockOut } </p>
          <p className="clock-content"> Clock Out </p>
        </div>
      </section>
      <br></br>
      <section className="student-button">
        {session?.user?.role &&
          <Link href="/StudentsAttendance">
            <button className="view-dev-Info">View All Attendance</button>
          </Link>
        }
      </section>
    </div>
  )
}

export default Dashboard