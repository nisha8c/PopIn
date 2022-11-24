import React from 'react'
import { useSession } from 'next-auth/react'
import LoginPage from '../components/LogInPage'
import LoggedIn from '../components/LoggedIn'

const Home = () => {
	const { data: session } = useSession()

	return (
		<>
			{session ? ( <LoggedIn /> ) : ( <LoginPage /> )}
		</>
	)
}

export default Home;
