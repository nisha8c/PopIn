import React from 'react'
import { signIn } from 'next-auth/react'
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
