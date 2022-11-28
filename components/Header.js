import React from 'react'
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()
  return (
    <>
      <section className="header-container">
        Welcome {session?.user?.role},<br/>{session?.user?.name}!
      </section>
    </>
  )
}
