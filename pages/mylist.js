import React from "react";
import { auth } from "../components/config/firebase";
const mylist = ({ isLoggedIn, handleAuth, user }) => {
  return (
    <div className="mx-10 text-white">
      {!isLoggedIn ?

        (

          <button className="btn" onClick={() => handleAuth()}>sign In With Google</button>
        ) : (

          <button className="btn" onClick={() => auth.signOut()}>Sign Out  </button>
        )
      }
      <div className="text-primary"> {user?.displayName || "login"}</div>

    </div>
  )
}

export default mylist;
