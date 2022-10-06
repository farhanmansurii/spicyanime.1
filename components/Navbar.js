import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="navbar  bg-transparent backdrop-blur flex  justify-between w-full z-10 ">
      <div className="">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">SpicyAnime </div>
        </Link>
      </div>
      <div className="">
        <Link href="/anime">
          <div className="btn btn-ghost normal-case text-lg">Anime </div>
        </Link>
        <Link href="/searchpage">
          <div className="btn btn-ghost normal-case text-lg">Search </div>
        </Link>


      </div>
    </div>
  )
}

export default Navbar;
