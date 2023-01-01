import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineGoogle } from "react-icons/ai";
const Navbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="navbar  self-center bg-base-100/20  border-b-2 border-secondary text-primary backdrop-blur-[2px] fixed z-30 hidden lg:flex">
      <div className='w-11/12 mx-auto top-0'>
        <div className="flex-1 ">
          <Link href='/' >
            <div className='  normal-case font-normal text-primary text-xl' >
              SpicyAnime
            </div>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 space-x-5">
            <Link href='/' >
              <button className='   font-damion btn btn-ghost normal-case text-primary text-xl' >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>

            <Link href='/searchpage' >
              <button className=' font-damion btn btn-ghost normal-case  text-primary text-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 scale-[125%]">
                  <path d="M6.5 9a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 102.248 7.309l1.472 1.471a.75.75 0 101.06-1.06l-1.471-1.472A4 4 0 009 5z" clipRule="evenodd" />
                </svg>

              </button>
            </Link>
            <Link href='/mylist' >
              <button className=' font-damion btn btn-ghost normal-case  text-primary text-xl'>
                {user ? (<div className="avatar">
                  <div className="w-7 rounded-full z-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt={user?.uid} />
                  </div>
                </div>) : <div className="text-primary"><AiOutlineGoogle className="w-6 h-6" /> </div>}
              </button>
            </Link>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
