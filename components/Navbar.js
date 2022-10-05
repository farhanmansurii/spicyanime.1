import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div className="navbar  bg-primary backdrop-blur flex justify-between w-full  ">
      <div className="">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">SpicyAnime </div>
        </Link>
      </div>
      <div className="">
        <Link href="/anime">
          <div className="btn btn-ghost normal-case text-lg">Anime </div>
        </Link>
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">Search </div>
        </Link>
        <Link href="/">
          <div className="btn btn-ghost normal-case text-lg">My List</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
