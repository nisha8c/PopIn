import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Profile = () => {

  const { data: session } = useSession();

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="profileInfo">{<img className="profilePic" src={session.user.image}></img>}</div>
        <div className="profileInfo">Name: {session.user.name}</div>
        <div className="profileInfo">Email: {session.user.email}</div>
      </div>
      {/* <Link href="/Settings">Go Back To Settings</Link> */}
      <Footer />
    </>
  )
}

export default Profile
