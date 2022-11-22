import { SessionProvider } from 'next-auth/react'
import '../styles/myApp.css'
import '../styles/Login.css'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp