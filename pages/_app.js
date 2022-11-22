import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import '../styles/myApp.css'
import '../styles/Login.css'
import '../styles/Header.css'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp