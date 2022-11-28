import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

import clientPromise from '../../../database/connectMongoDB'

const options = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: '/',
	},
	callbacks: {
		async session({ session, token, user }) {
			session.user.role = user.role; // Add role value to user object so it is passed along with session
			session.user.id = user.id;
			return session;
		},
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
    // async jwt({ token, user, account, profile, isNewUser }) {
		// 	console.log('can you see me');
		// 	console.log('jwt is', token)
    //   return token
    // },
	},
	adapter: MongoDBAdapter(clientPromise),
}

const auth = (req, res) => NextAuth(req, res, options)

export default auth