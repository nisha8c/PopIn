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
  const [documentid, setDocumentId] = useState(null)
  const [entryid, setEntryId] = useState(null)

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

  const current = new Date();
  
  const formatData = (input) => {
    if (input > '9') {
      return input;
    } else return `0${input}`;
  };
  const currentDate = current.getFullYear() + '-' + formatData(current.getMonth()+1) + '-' + formatData(current.getDate());
  
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
          email: session.user.email,
          timesheetDate: `${currentDate}`,
          startTime: `${current}`
        }),
      })
        .then(response => response.json())
        .then(newEntry => {
          setDocumentId(() => newEntry.documentId)
          setEntryId(() => newEntry.entryId)
        });

      setAttendanceButton(popout);
    } else {
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
        .then(updatedEntry => console.log('updatedEntry: ', updatedEntry));

      setAttendanceButton(popin);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-clock">{time.setZone('Europe/Stockholm').toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      <h3 className="dashboard-calendar">{day}, {monthName} {date}</h3>

      <button className='in-out' onClick={changeAttendanceButton}>
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
