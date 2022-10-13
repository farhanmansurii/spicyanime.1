import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const Navbar = () => {
  const router = useRouter();
  return (
    <div className="navbar  self-center bg-secondary  text-primary backdrop-blur-sm fixed z-30 hidden lg:flex">
      <div className='w-10/12 mx-auto top-0'>

        <div className="flex-1 ">
          <Link href='/' >
            <button className='className="btn btn-ghost normal-case text-primary text-xl' >
              SpicyAnime
            </button>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 space-x-5">
            <Link href='/' >
              <button className='className="btn btn-ghost normal-case text-primary text-xl' >
                Home
              </button>
            </Link>
            <Link href='/anime' >
              <button className='className="btn btn-ghost normal-case text-primary text-xl'>
                Genre
              </button>
            </Link>
            <Link href='/searchpage' >
              <button className='className="btn btn-ghost normal-case  text-primary text-xl'>
                Search
              </button>
            </Link>
            <Link href='/mylist' >
              <button className='className="btn btn-ghost normal-case  text-primary text-xl'>
                WatchList
              </button>
            </Link>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
