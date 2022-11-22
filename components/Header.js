import React from 'react'
import Image from 'next/image'
import { BsFillCpuFill } from 'react-icons/bs'

export default function Header() {
  const superSettingsHandler = () => {
    console.log('ooo that tickles')
  }
  return (
    <>
      <section className="header-container">
        <h1 className="header-logo">
          <Image 
            src="/../public/pop-in-logo.png" 
            alt="logo" 
            width={300}
            height={100}
            priority />
        </h1>
        <BsFillCpuFill onClick={superSettingsHandler} className="header-settings__icon"/>
      </section>
    </>
  )
}
