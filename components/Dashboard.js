import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useSession } from "next-auth/react";
import { BsClock, BsClockFill } from "react-icons/bs";

const Dashboard = () => {
  const { data: session } = useSession()
  const [time, setTime] = useState(DateTime.now());
  const fixedTime = DateTime.local()
  const current = new Date();
  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = weekday[current.getDay()];
  const date = `${current.getDate()}`;
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName = month[current.getMonth()];

  const [entryid, setEntryId] = useState(null)
  const [inOutStatus, setInOutStatus] = useState(false);
  const [start, setStart] = useState('--:--');
  const [end, setEnd] = useState('--:--');

  useEffect(() => {
    const inOutStatus = JSON.parse(localStorage.getItem('inOutStatus'));
    if (inOutStatus) {
      setInOutStatus(inOutStatus);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inOutStatus', JSON.stringify(inOutStatus));
  }, [inOutStatus]);


  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const getButton = status => {
    return (
      status ? 
        <button onClick={handleOutButton} className="popButtonOut">OUT</button> 
        : 
        <button onClick={handleInButton} className="popButtonIn">IN</button>
    )
  }

  const toggleInOutButton = () => setInOutStatus(() => !inOutStatus)

  const handleInButton = () => {
    toggleInOutButton();
    fetch('api/entries', {
      method: 'POST',
      body: JSON.stringify({
        startTime: `${fixedTime}`,
        userId: session.user.id
      }),
    })
      .then(response => response.json())
      .then(newEntry => {
        setEntryId(() => newEntry.entry._id)
        const theStart = newEntry.entry.startTime.split('T')[1].split(':');
        const displayStart = theStart[0] + ':' + theStart[1];
        setStart(displayStart);
      });
  }

  const handleOutButton = () => {
    toggleInOutButton();
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
      .then(updatedEntry => {
        console.log(updatedEntry);
        // const theEnd = updatedEntry.endTime.split('T')[1].split(':');
        // const displayEnd = theEnd[0] + ':' + theEnd[1];
        // setEnd(displayEnd);
      })
  }

  const startTime = () =>  <p> {start} </p>
  const endtTime = () =>  <p> {end} </p>

  return (
    <div className="dashboard">
      <h1 className="dashboard-clock">{time.setZone('Europe/Stockholm').toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      <h3 className="dashboard-calendar">{day}, {monthName} {date}</h3>
      {
        getButton(inOutStatus)
      }
      <section className="details_container">
        <div className="clockIn_container">
          <BsClock className="clockIn" />
          { startTime() }
          <p>Clock In</p>
        </div>

        <div className="clockIn_container">
          <BsClockFill className="clockIn" />
          { endtTime() }
          <p>Clock Out</p>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
