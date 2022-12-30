import React from "react";
import AnimeCard from "../components/AnimeCard";
export default function Mylist({ user, watchlist }) {
  console.log(watchlist)
  return (
    <div >
      {user ? (<div className="text-primary font-damion ml-5 w-10/12 text-3xl my-4"> {user?.displayName}&apos;s WatchList</div>) : (<div className="text-primary my-4  ml-4 text-3xl font-damion "> Login To View Your Watchlist</div>)}
      {watchlist.length > 0 && (
        <div className="p-5 grid my-10 grid-cols-3 gap-2 md:grid-cols-6  lg:w-10/12 mb-[6rem]">
          {watchlist.map((e) =>
            <AnimeCard animeImg={e.image} title={e.title} id={e.id} key={e.id} />

          )}
        </div>)
      }
    </div>
  )
}
