import React from "react";
import { auth } from "../components/config/firebase";
const mylist = ({ isLoggedIn, handleAuth, user, watchlist, setwatchlist }) => {
  return (
    <div className="mx-10 text-white">
      {!isLoggedIn ?

        (

          <button className="btn" onClick={() => handleAuth()}>sign In With Google</button>
        ) : (

          <button className="btn" onClick={() => auth.signOut()}>Sign Out  </button>
        )
      }
      <div className="text-primary"> {user?.displayName || ""}</div>
      <div className="text-primary"> {watchlist}</div>

    </div>
  )
}

export default mylist;
