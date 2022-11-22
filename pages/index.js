import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/LogIn'

const Home = () => {
	const { data: session } = useSession()
	const { push, asPath } = useRouter()

	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })
		push(data.url)
	}
  
	return (
		<>
			{session ? ( 
				<>
					<h1>Signed in as {session.user.email}</h1>
					<button onClick={handleSignOut}>Sign out</button>
          <button onClick={() => console.log(session)}>Click ME</button>
				</>
			) : (
				<>
          <section className="main-title">
            <h1>Welcome to the PopIn App</h1>
            <h2>An attandance app for organized organizations</h2>
          </section>
					<Login />
				</>
			)}
		</>
	)
}

export default Home;
