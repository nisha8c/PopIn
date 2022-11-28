import React from 'react'
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  const determineUser = (session) => session?.user.role ? 'Instructor' : 'Student'

  return (
    <>
      <section className="header-container">
        Welcome, {session?.user?.name}!<br></br>
        You are logged in as {determineUser(session)}
      </section>
    </>
  )
}
