import React from 'react'

const Dashboard = () => {
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className='dashboard'>
      <h3>Welcome, !</h3>
      <h3>{date}</h3>
      <h3>{time}</h3>
    </div>
  )
}

export default Dashboard
