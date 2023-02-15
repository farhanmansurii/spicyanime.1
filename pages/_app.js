import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import BottomNavbar from "../components/BottomNavbar";
import { auth, db } from "../components/config/firebase";
import Navbar from "../components/Navbar";
import useAuth from '../components/UseAuth';
import store from '../redux/store';
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [watchlist, setwatchlist] = useState([])
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {

      })
      .catch((error) => {
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
    <Provider store={store}><div >
      <Navbar />
      <BottomNavbar user={user} isLoggedIn={isLoggedIn} />
    </div>

      <NextNProgress color="#8B0000" startPosition={0.3} height={5} showOnShallow={true} options={{ easing: 'ease-in' }} />
      <div className="sm:pb-24 lg:pb-5 pt-6 lg:pt-24  ">

        <Component isLoggedIn={isLoggedIn} key={router.asPath} user={user} watchlist={watchlist} setwatchlist={setwatchlist} {...pageProps} handleAuth={handleAuth} />
      </div>
    </Provider>
  )
}

export default MyApp;
