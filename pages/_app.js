import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect, useState } from 'react';
import BottomNavbar from "../components/BottomNavbar";
import { db } from "../components/config/firebase";
import Navbar from "../components/Navbar";
import useAuth from '../components/UseAuth';
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [contwatch, setcontwatch] = useState([])
  const [watchlist, setwatchlist] = useState([])
  const { isLoggedIn, user } = useAuth();
  const animeRef = doc(db, 'users', `${user?.email}`);
  function removeduplicateanime(contwatch) {
    const uniqueIds = new Set();
    const unique = contwatch.filter(element => {
      const isDuplicate = uniqueIds.has(element.id);

      uniqueIds.add(element.id);

      if (!isDuplicate) {
        return true;
      }

      return false;
    });

    console.log(unique)
    return (

      setcontwatch(unique)
    )

  }
  const handleAuth = async () => {
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
      setcontwatch(() => removeduplicateanime((doc.data()?.continue).reverse()))

    })

    return () => {
    }
  }, [user]);

  return (
    <><div >
      <Navbar />
      <BottomNavbar user={user} isLoggedIn={isLoggedIn} />
    </div>
      <motion.div
        key={router.route}
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
        <NextNProgress color="#8e0024" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} options={{ easing: 'ease-in', speed: 500, showSpinner: false }} />
        <div className="sm:pb-24 lg:pb-5 pt-6 lg:pt-24  ">

          <Component isLoggedIn={isLoggedIn} contwatch={contwatch} setcontwatch={setcontwatch} key={router.asPath} user={user} watchlist={watchlist} setwatchlist={setwatchlist} {...pageProps} handleAuth={handleAuth} />
        </div>
      </motion.div>
    </>
  )
}

export default MyApp;
