import '../styles/globals.css'
import Navbar from '../components/Navbar'
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
  <div className="universal-wrapper">
    <Navbar/>
    <Component {...pageProps} />
  </div>
  );
}

export default MyApp
