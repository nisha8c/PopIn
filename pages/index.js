import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/LogIn'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Dashboard from '../components/Dashboard'

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
					<button onClick={handleSignOut}>Sign out</button>
					<Dashboard />
					<Footer />
				</>
			) : (
				<>
          <section className="main-title__container">
            <h1 className="main-title">PopIn</h1>
            <h2 className="main-subtitle">mark your attandance</h2>
          </section>
					<Login />
				</>
			)}
		</>
	)
}

export default Home;
