import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { DateTime } from 'luxon';
import { useSession } from "next-auth/react"
import popin from '../public/FULLin.png';
import popout from '../public/FULLout.png';

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(DateTime.now());
  const [attendanceButton, setAttendanceButton] = useState(popin);
  const [entryid, setEntryId] = useState(null)
  const [userId, setUserId] = useState(null)

  // useState(() => {
  //   const storedButtonImg = JSON.parse(localStorage.getItem('attendanceButton'));
  //   if (storedButtonImg) setAttendanceButton(storedButtonImg);
  // });

  // useEffect(() => {
  //   localStorage.setItem('attendanceButton', JSON.stringify(attendanceButton));
  // }, [attendanceButton]);

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const fixedTime = DateTime.local()

  const current = new Date();

  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = weekday[current.getDay()];
  const date = `${current.getDate()}`;

  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = month[current.getMonth()];

  const changeAttendanceButton = () => {
    if (attendanceButton === popin) {
      fetch('api/entries', {
        method: 'POST',
        body: JSON.stringify({
          startTime: `${fixedTime}`,
          userId: session.user.id
        }),
      })
        .then(response => response.json())
        .then(newEntry => {
          setUserId(() => newEntry.entry.userId)
          setEntryId(() => newEntry.entry._id)
          console.log(newEntry)
        });

      setAttendanceButton(popout);
    } else {
      fetch(`api/entries/${entryid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          entryid: entryid,
          endTime: `${fixedTime}`
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(updatedEntry => console.log(updatedEntry));

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
        width={180}
        height={180}
      />
      </button>
    </div>
  )
}

export default Dashboard
