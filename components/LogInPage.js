import React from 'react'
import { signIn } from 'next-auth/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'

export default function SignIn() {
  const providers = [
    {
      name: 'github',
      displayName: 'GitHub',
      Icon: BsGithub,
    },
    {
      name: 'google',
      displayName: 'Google',
      Icon: BsGoogle,
    },
  ]

  const handleOAuthSignIn = provider => () => signIn(provider)

  return (
    <main className='root'>
    <section className="login-page">
      <div className="logo">POP<br/>IN</div>
      <h3>mark your attendance</h3>
        {
          providers.map(({name, Icon, displayName}) => (
            <button className="form-button" key={name} type='button' onClick={handleOAuthSignIn(name)}>
              <Icon className="form-icon__service"/>
              <span className="form-button__innerText">Sign in with {displayName}</span>
            </button>
          ))
        }
    </section>
    </main>
  )
}
