import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/LogIn'
import Header from '../components/Header'

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
          <Header />
					<h1>Signed in as {session.user.email}</h1>
					<button onClick={handleSignOut}>Sign out</button>
          <button onClick={() => console.log(session)}>Click ME</button>
				</>
			) : (
				<>
          <section className="main-title">
            <h1>Welcome to the PopIn App</h1>
            <p>Are you a developer?</p>
            <p>Please log in here:</p>
          </section>
					<Login />
				</>
			)}
		</>
	)
}

export default Home;
