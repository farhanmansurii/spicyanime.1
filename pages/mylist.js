import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { auth, db } from "../components/config/firebase";
export default function Mylist({ user, isLoggedIn, handleAuth, signOut }) {
  const [animes, setAnimes] = useState([])
  const [userid, setUserid] = useState()
  async function login(user) {
    const docRef = doc(db, "users", `${user?.email}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.data()) {

      setDoc(docRef, {
        savedAnime: []
      })
    }
    else {
      console.log("user exists")
    }
  }
  useEffect(() => {
    login(user);
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setAnimes(doc.data()?.savedAnime);
    })
    return () => {

    }
  }, [user]);

  return (
    <div className="mx-10 text-white">
      {!isLoggedIn ? (<button onClick={() => handleAuth()} className='btn btn-secondary w-full my-3' >CLick to login </button>) : (<button onClick={() => auth.signOut()} className='btn btn-secondary w-full my-3'> Logout</button>)}

      {user && (<div className="text-primary text-3xl"> {user?.displayName} &apos;s WatchList</div>)}
      {animes ? (
        <div className="p-5 grid my-10 grid-cols-2 gap-2 md:grid-cols-6  lg:w-10/12 mb-[6rem]">


          {animes.map((e) => <AnimeCard animeImg={e.image} title={e.title} id={e.id} key={e.id} />)}
        </div>) : (
        <div> Login to View Your watchlist</div>
      )
      }
    </div>
  )
}
