import React from "react";
import { auth } from "./firebase";
const mylist = ({ addlist, isLoggedIn, handleAuth, user }) => {

  console.log(addlist)
  return (
    <div className="mx-10 text-white">
      {!isLoggedIn ?

        (

          <button className="btn" onClick={() => handleAuth()}>sign In With Google</button>
        ) : (

          <button className="btn" onClick={() => auth.signOut()}>Sign Out</button>
        )
      }
    </div>
  )
}

export default mylist;
