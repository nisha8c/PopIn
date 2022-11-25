import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';


const About = () => {
  return (
    <>
    <Header />
    <section className="about-container">
      <h2>About Us</h2>
      <p className="about">This app was created by the PepperShakers from &lt;/salt&gt; School of applied technology.
        The team is made up of Pawel Obrzut, Nisha Chavan, Manoj Singh, and Claudia Carion.
        For three months, we went through the &lt;/salt&gt; Fullstack Javascript bootcamp.
        This is our final project, and the idea for the app was inspired by our daily attendance marking during the bootcamp.</p>
    </section>
    <Footer />
    </>
  )
}

export default About
