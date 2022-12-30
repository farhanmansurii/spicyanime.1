import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineGoogle, AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
const Navbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="navbar  self-center bg-base-100/20  border-b-2 border-secondary text-primary backdrop-blur-[2px] fixed z-30 hidden lg:flex">
      <div className='w-11/12 mx-auto top-0'>
        <div className="flex-1 ">
          <Link href='/' >
            <button className=' btn font-damion btn-ghost normal-case text-primary text-xl' >
              SpicyAnime
            </button>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 space-x-5">
            <Link href='/' >
              <button className='   font-damion btn btn-ghost normal-case text-primary text-xl' >
                <AiOutlineHome className="w-6 h-6" />
              </button>
            </Link>

            <Link href='/searchpage' >
              <button className=' font-damion btn btn-ghost normal-case  text-primary text-xl'>
                < FiSearch className="w-6 h-6" />
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
