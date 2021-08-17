import '../styles/globals.css'
import Navbar from '../components/Navbar'
import React from 'react';
import LeftNav from '../components/LeftNav';

function MyApp({ Component, pageProps }) {
  return (
  <div className="universal-wrapper">
    {pageProps.user ? <Navbar user={pageProps.user}/> : null}
    <div className="left-window-wrapper">
      {pageProps.projects ? <LeftNav projects={pageProps.projects} currentProject={pageProps.currentProject}/> : null}
      <Component {...pageProps} />
    </div>
  </div>
  );
}

export default MyApp
