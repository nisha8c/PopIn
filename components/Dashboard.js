import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { DateTime } from 'luxon';
import { useSession } from "next-auth/react"
import popin from '../public/popin.png';
import popout from '../public/popout.png';

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(DateTime.now());
  const [attendanceButton, setAttendanceButton] = useState(popin);

  useState(() => {
    const storedButtonImg = JSON.parse(localStorage.getItem('attendanceButton'));
    if (storedButtonImg) setAttendanceButton(storedButtonImg);
  });

  useEffect(() => {
    localStorage.setItem('attendanceButton', JSON.stringify(attendanceButton));
  }, [attendanceButton]);


  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const current = new Date();

  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = weekday[current.getDay()];
  const date = `${current.getDate()}`;

  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = month[current.getMonth()];

  const changeAttendanceButton = () => {
    if (attendanceButton === popin) {
      fetch('api/entry', {
        method: 'POST',
        body: JSON.stringify({
          punchIn: current.toISOString().split('T')[0],
          userId: session.user.id
        }),
      })
        .then(response => response.json())
        .then(newEntry => console.log(newEntry));

      setAttendanceButton(popout);
    } else {
      setAttendanceButton(popin);
    }
  };

  const getButton = () => {

  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-clock">{time.setZone('Europe/Stockholm').toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      <h3 className="dashboard-callendar">{day}, {monthName} {date}</h3>

      <button className='inOut' onClick={changeAttendanceButton}>
      <Image
        src={attendanceButton}
        alt="toggle button"
        width={160}
        height={160}
      />
      </button>
    </div>
  )
}

export default Dashboard
