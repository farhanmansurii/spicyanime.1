import React, { useState } from "react";
import AnimeCard from "../components/AnimeCard";
export default function Mylist({ user, isLoggedIn, handleAuth, setAnimes, animes, signOut }) {
  const [userid, setUserid] = useState()

  return (
    <div className="mx-10 text-white">
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
