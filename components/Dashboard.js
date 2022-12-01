import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
const moment = require('moment');
import Link from 'next/link';
import { BsClock, BsClockFill } from "react-icons/bs";

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(Date.now());
  const [attendanceButton, setAttendanceButton] = useState(false);
  const [clockIn, setClockIn] = useState('--:--');
  const [clockOut, setClockOut] = useState('--:--');
  const [storage, setStorage] = useState([]);

  useState(() => {
    const storage1 = JSON.parse(localStorage.getItem('storage'));
    if (storage1) {  
      setAttendanceButton(storage1.btn);
      setClockIn(storage1.in);
      setClockOut(storage1.out);
      setStorage(storage1);
    }
  }, []);

  useEffect(() => {
    localStorage.clear();
    const storage2 = {
      btn: attendanceButton,
      in: clockIn,
      out: clockOut
    }
    localStorage.setItem('storage', JSON.stringify(storage2));
  }, [attendanceButton, clockIn, clockOut]);

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
    const displayInTime = moment(current).format('HH:mm')
    setClockIn(displayInTime)
    setClockOut('--:--')

    fetch('api/entries', {
      method: 'POST',
      body: JSON.stringify({
        email: session.user.email,
        timesheetDate: `${currentDate}`,
        startTime: new Date(),
      }),
    })
    .then(response => response.json())
    .then(response => {

    });

    toggleInOutButton();
  }

  const handleOutBtn = () => {
    const displayOutTime = moment(current).format('HH:mm')
    const currentDate = moment(new Date).format('YYYY-MM-DD');
    setClockOut(displayOutTime)

    fetch('api/entries', {
      method: 'PATCH',
      body: JSON.stringify({ 
        email: session.user.email,
        timesheetDate: `${currentDate}`,
        endTime: new Date(), 
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(response => {
      
    });

    toggleInOutButton();
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