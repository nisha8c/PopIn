import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useSession } from "next-auth/react";

const Profile = () => {

  const { data: session } = useSession();

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="profileInfo">{<picture><img className="profilePic" alt="profile pic" src={session?.user?.image}></img></picture>}</div>
        <div className="profileInfo">Name: {session?.user.name}</div>
        <div className="profileInfo">Email: {session?.user.email}</div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
