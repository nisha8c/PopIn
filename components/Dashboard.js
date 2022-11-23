import { useState, useEffect } from 'react'
import { DateTime } from 'luxon';
import { useSession } from "next-auth/react"

const determineUser = (session) => session.user.role ? 'Instructor' : 'Student'

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [time, setTime] = useState(DateTime.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.now()), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const current = new Date();
  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let day = weekday[current.getDay()];
  const date = `${current.getDate()}`;

  const month = ['January','February','March','April','May','June','July','August','September','October','Nov','December'];
  let monthName = month[current.getMonth()];

  return (
    <div className="dashboard">
      <h1 className="dashboard-clock">{time.setZone('Europe/Stockholm').toLocaleString(DateTime.TIME_WITH_SECONDS)}</h1>
      <h3 className="dashboard-callendar">{day}, {monthName} {date}</h3>
    </div>
  )
}

export default Dashboard
