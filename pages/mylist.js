import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { auth, db } from "../components/config/firebase";

export default function Mylist({ user, isLoggedIn, handleAuth }) {
  const [animes, setAnimes] = useState([])

  useEffect(() => {
    const refreshData = () => {
      if (!user) {
        setAnimes([])
        return
      }
      const q = query(collection(db, "watchlist"), where("userId", "==", user.uid))
      onSnapshot(q, (querySnapchot) => {
        let ar = []
        querySnapchot.docs.forEach((doc) => {
          ar.push({ id: doc.id, ...doc.data() })
        })
        setAnimes(ar)
      })
    }
    refreshData()
  }, [user])
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
