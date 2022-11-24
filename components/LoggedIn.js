import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Dashboard from './Dashboard'

const LoggedIn = ({handleSignOut}) => {
  return (
    <div>
      <Header />
      <button onClick={handleSignOut}>Sign out</button>
      <Dashboard />
			<Footer />
    </div>
  )
}

export default LoggedIn
