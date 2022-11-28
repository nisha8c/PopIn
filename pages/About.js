import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';


const About = () => {
  return (
    <section className="about-page">
    <Header />
    <section className="about-container">
      <h2>About Us</h2>
      <p className="about">This app was created by the PepperShakers from &lt;/salt&gt; School of applied technology Stockholm.
        The team is made up of Pawel Obrzut, Nisha Chavan, Manoj Singh, and Claudia Carion.
        For three months, we went through the &lt;/salt&gt; Fullstack Javascript bootcamp.
        This is our final project, and the idea for the app was inspired by our daily attendance marking during the bootcamp.</p>
    </section>
    <section className="contactinfo">
    <h3>Github</h3>
    <ul className="github-container">
      <li><a href="https://github.com/PawelObrzut">Pawel Obrzut</a></li>
      <li><a href="https://github.com/nisha8c">Nisha Chavan</a></li>
      <li><a href="https://github.com/MartianCoder79">Manoj Singh</a></li>
      <li><a href="https://github.com/claudiacarion">Claudia Carion</a></li>
    </ul>
    <h3>LinkedIn</h3>
    <ul className="linkedin-container">
      <li><a href="https://www.linkedin.com/in/pawel-obrzut-023762110/">Pawel Obrzut</a></li>
      <li><a href="https://www.linkedin.com/in/nisha-c-a15b59220/">Nisha Chavan</a></li>
      <li><a href="https://www.linkedin.com/in/manoj-singh-4772b8255/">Manoj Singh</a></li>
      <li><a href="https://www.linkedin.com/in/claudia-pereira-carion/">Claudia Carion</a></li>
    </ul>

    </section>
    <Footer />
    </section>
  )
}

export default About
