import React from 'react'
import Script from 'next/script'

const Footer = () => {
  return (
    <>
    <Script src="https://kit.fontawesome.com/3ea227b01c.js" crossorigin="anonymous"></Script>
      <div className='footer'>
        <button className="footer-button"><i className="fa-solid fa-calendar-days"></i></button>
        <button className="footer-button"><i className="fa-solid fa-house"></i></button>
        <button className="footer-button"><i className="fa-solid fa-gear"></i></button>
      </div>
    </>
  )
}

export default Footer
