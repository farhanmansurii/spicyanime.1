import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect, useState } from 'react';
import BottomNavbar from "../components/BottomNavbar";
import { auth, db } from "../components/config/firebase";
import Navbar from "../components/Navbar";
import useAuth from '../components/UseAuth';
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [contwatch, setContwatch] = useState()
  const [watchlist, setwatchlist] = useState([])
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
  async function login(user) {
    const docRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.data()) {

      setDoc(docRef, {
        savedAnime: [],
        continue: []
      })
    }
    else {
      console.log("user exists")
    }
  }
  useEffect(() => {
    login(user);
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setwatchlist(doc.data()?.savedAnime);
    })
    return () => {
    }
  }, [user]);

  return (
    <><motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      <div >
        <Navbar />
        <BottomNavbar user={user} isLoggedIn={isLoggedIn} />
      </div><NextNProgress color="#444444" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} options={{ easing: 'ease-in', speed: 500, showSpinner: false }} />
      <div className="sm:pb-24 lg:pb-5 pt-6 lg:pt-24  ">

        <Component isLoggedIn={isLoggedIn} contwatch={contwatch} setContwatch={setContwatch} key={router.asPath} user={user} watchlist={watchlist} setwatchlist={setwatchlist} {...pageProps} handleAuth={handleAuth} />
      </div>
    </motion.div>
    </>
  )
}

export default MyApp;
