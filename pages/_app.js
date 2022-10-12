import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import React, { useState } from 'react';
import BottomNavbar from "../components/BottomNavbar";
import { auth } from '../components/config/firebase';
import Navbar from "../components/Navbar";
import useAuth from '../components/UseAuth';
import "../styles/globals.css";
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [watchlist, setwatchlist] = useState()
  const { isLoggedIn, user } = useAuth();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <>
      <div >
        <Navbar />
        <BottomNavbar user={user} isLoggedIn={isLoggedIn} />
      </div>
      <div className="sm:pb-24 lg:pb-5 pt-6 lg:pt-24  ">
        <Component isLoggedIn={isLoggedIn} key={router.asPath} user={user} watchlist={watchlist} setwatchlist={setwatchlist} {...pageProps} handleAuth={handleAuth} />
      </div>
    </>
  )
}

export default MyApp;
