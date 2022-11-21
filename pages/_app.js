import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, Grid } from '@chakra-ui/react'
import '../styles/myApp.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<Grid className='grid-component'>
					<Component {...pageProps} />
				</Grid>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default MyApp