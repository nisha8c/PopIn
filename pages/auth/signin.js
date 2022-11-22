import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'

export default function SignIn() {
  const providers = [
    {
      name: 'github',
      Icon: BsGithub,
    },
    {
      name: 'google',
      Icon: BsGoogle,
    },
  ]

  const { data: session, status } = useSession()
	const { push } = useRouter()

  if (status === 'loading') {
    return <h1>Checking Authentication...</h1>
  } 

  if (session) {
		setTimeout(() => {
			push('/')
		}, 5000)
		return <h1>you are already signed in</h1>
	}

  const handleOAuthSignIn = provider => () => signIn(provider)
  const handleSubmit = (e) => e.preventDefault()

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        {
          providers.map(({name, Icon}) => (
            <button className="form-button" key={name} type='submit' onClick={handleOAuthSignIn(name)}><Icon />  Sign in with {name}</button>
          ))
        }
      </form>
    </>
  )
}
