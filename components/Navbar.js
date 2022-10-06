import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="navbar  bg-transparent backdrop-blur flex  justify-between w-full z-10 ">
      <div className="">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">SpicyAnime </div>
        </Link>
      </div><Link href="/anime">
          <div className="btn btn-ghost normal-case text-lg">Anime </div>
        </Link>
      <div className="hidden lg:block">
        
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">Search </div>
        </Link>
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">My List</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
