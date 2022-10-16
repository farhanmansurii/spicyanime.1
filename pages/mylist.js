import React, { useState } from "react";
import AnimeCard from "../components/AnimeCard";
export default function Mylist({ user, isLoggedIn, handleAuth, watchlist, setwatchlist, signOut }) {
  const [userid, setUserid] = useState()
  console.log(watchlist)
  return (
    <div className="mx-10 text-white">
      {user && (<div className="text-primary text-3xl"> {user?.displayName} &apos;s WatchList</div>)}
      {watchlist ? (
        <div className="p-5 grid my-10 grid-cols-2 gap-2 md:grid-cols-6  lg:w-10/12 mb-[6rem]">


          {watchlist.map((e) => <AnimeCard animeImg={e.image} title={e.title} id={e.id} key={e.id} />)}
        </div>) : (
        <div> Login to View Your watchlist</div>
      )
      }
    </div>
  )
}
