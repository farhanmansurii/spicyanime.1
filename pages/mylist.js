import React, { useState } from "react";
import AnimeCard from "../components/AnimeCard";
export default function Mylist({ user, isLoggedIn, handleAuth, watchlist, setwatchlist, signOut }) {
  const [userid, setUserid] = useState()
  console.log(watchlist)
  return (
    <div className=" text-white">
      {user ? (<div className="text-primary font-damion ml-5 text-3xl my-4"> {user?.displayName}&apos;s WatchList</div>) : (<div className="text-primary my-4 text-3xl font-damion "> Login To View Your Watchlist</div>)}
      {watchlist ? (
        <div className="p-5 grid my-10 grid-cols-3 gap-2 md:grid-cols-6  lg:w-10/12 mb-[6rem]">
          {watchlist.map((e) => <AnimeCard animeImg={e.image} title={e.title} id={e.id} key={e.id} />)}
        </div>) : (
        <div className="text-primary text-2xl"> Login to View Your watchlist</div>
      )
      }
    </div>
  )
}
