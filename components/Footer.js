import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
    <Script src="https://kit.fontawesome.com/3ea227b01c.js" crossorigin="anonymous"></Script>
      <div className="footer">
        <Link href="/TimeSheet">
          <button className="footer-button">
           <i className="fa-solid fa-calendar-days"></i>
          </button>
        </Link>

        <Link href="/">
          <button className="footer-button">
           <i className="fa-solid fa-house"></i>
          </button>
        </Link>

        <Link href="/Settings">
          <button className="footer-button">
           <i className="fa-solid fa-gear"></i>
          </button>
        </Link>
      </div>
    </>
  )
}

export default Footer
