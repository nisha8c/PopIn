import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import LoginPage from '../components/LogInPage'
import LoggedIn from '../components/LoggedIn'

const Home = () => {
	const { data: session } = useSession()
	const { push, asPath } = useRouter()

	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })
		push(data.url)
	}

	return (
		<>
			{session ? ( <LoggedIn handleSignOut={handleSignOut}/> ) : ( <LoginPage /> )}
		</>
	)
}

export default Home;
