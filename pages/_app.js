import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import '../styles/myApp.css'
import '../styles/Login.css'
import '../styles/Header.css'
import '../styles/Footer.css'
import '../styles/Dashboard.css'
import '../styles/Settings.css'
import '../styles/Timesheet.css'
import '../styles/About.css'
import '../styles/StudentsAttendance.css'
import '../styles/Profile.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp