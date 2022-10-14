import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { auth, db } from "../components/config/firebase";
export default function Mylist({ user, isLoggedIn, handleAuth }) {
  const [animes, setAnimes] = useState([])
  const [userid, setUserid] = useState()

  useEffect(() => {
    async function login(user) {
      await setDoc(doc(db, 'users', user.email), {
        savedAnime: []
      })
    }
    return () => {
      login(user);
    }
  }, [user]);

  return (
    <div className="mx-10 text-white">
      {!isLoggedIn ?

        (

          <button className="btn" onClick={() => handleAuth()}>Google</button>
        ) : (

          <button className="btn" onClick={() => auth.signOut()}>Sign Out  </button>
        )
      }
      {user && (<div className="text-primary text-3xl"> {user?.displayName} &apos;s WatchList</div>)}
      {user ? (
        <div className="p-5 grid my-10 grid-cols-2 gap-2 md:grid-cols-6  lg:w-10/12 mb-[6rem]">


          {animes.map((e) => <AnimeCard animeImg={e.image} title={e.title} id={e.id} key={e.id} />)}
        </div>) : (
        <div> Login to View Your watchlist</div>
      )
      }
    </div>
  )
}
