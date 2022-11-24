import React from 'react'
import Image from 'next/image'
import { BsFillCpuFill } from 'react-icons/bs'
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  const superSettingsHandler = () => {
    console.log('ooo that tickles')
  }
  return (
    <>
      <section className="header-container">
        Welcome, {session.user.name}!
      </section>
    </>
  )
}
