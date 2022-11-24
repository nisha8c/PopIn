import React from 'react'
import { signIn } from 'next-auth/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import Image from 'next/image'
import logo from '../public/LGlogo.png';


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
  const handleSubmit = (e) => e.preventDefault()

  return (
    <>
    <section className="login-page">
      <Image
        src={logo}
        alt="logo"
        width={220}
        height={220}
        priority
      />
      <h3>mark your attendance</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        {
          providers.map(({name, Icon, displayName}) => (
            <button className="form-button" key={name} type='submit' onClick={handleOAuthSignIn(name)}>
              <Icon className="form-icon__service"/>
              <span className="form-button__innerText">Sign in with {displayName}</span>
            </button>
          ))
        }
      </form>
    </section>
    </>
  )
}
