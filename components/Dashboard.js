import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { DateTime } from 'luxon';
import { useSession } from "next-auth/react"
import popin from '../public/LGpopin.png';
import popout from '../public/LGpopout.png';

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(DateTime.now());
  const [attendanceButton, setAttendanceButton] = useState(popin);
  const [entryid, setEntryId] = useState(null)
  const [userId, setUserId] = useState(null)

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
  const number = 9;

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
          startTime: current.toISOString(),
          userId: session.user.id
        }),
      })
        .then(response => response.json())
        .then(newEntry => {
          setUserId(() => newEntry.entry.userId)
          setEntryId(() => newEntry.entry._id)
        });

      setAttendanceButton(popout);
    } else {
      fetch(`api/entry/${entryid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          endTime: current.toISOString()
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      setAttendanceButton(popin);
    }
  };

  const getButton = () => {

  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-clock">{time.setZone('Europe/Stockholm').toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      <h3 className="dashboard-calendar">{day}, {monthName} {date}</h3>

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
