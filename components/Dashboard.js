import React from 'react'
import Image from 'next/image'
import { useState } from "react";
import popin from '../public/popin.png';
import popout from '../public/popout.png';

const Dashboard = () => {
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const [name, setName] = useState(popin);

  const changeName = () => {
    let value = name;

    if (value === popin) {
      setName(popout);
    } else {
      setName(popin);
    }
  };

  return (
    <div className='dashboard'>
      <h3>Welcome, !</h3>
      <h3>{date}</h3>
      <h3>{time}</h3>
      <button className='inOut' onClick={changeName}>
      <Image
        src={name}
        alt="toggle button"
        width={160}
        height={160}
      />
      </button>
    </div>
  )
}

export default Dashboard
