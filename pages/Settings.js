import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

export default function Settings() {

  const { push, asPath } = useRouter()

  const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' })
		push(data.url)
	}

  return (
    <>
      <Header />
      <section className="settings-container">
        <h2>Settings</h2>
        <div className='theme-changer'>

          <Link href="/Profile">
            <button className="settings-button">View Profile</button>
          </Link>
          {/* <button className="settings-button" onClick={setDarkTheme}>
            Change Theme
          </button> */}
          <Link href="/About">
            <button className="settings-button">About Us</button>
          </Link>
          <button className="settings-button" onClick={handleSignOut}>Sign out</button>
        </div>
      </section>
      <Footer />
    </>
  )
}
