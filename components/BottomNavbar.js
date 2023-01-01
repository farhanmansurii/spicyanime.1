/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
const BottomNavbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="btm-nav border-2 border-secondary bg-base-100/40 backdrop-blur-md  btm-nav-sm text-sm mb-[2rem] mx-auto rounded-full w-6/12 align-self-center font-bold fixed z-30 lg:hidden  " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active :  text-secondary  bg-base-100/40 rounded-l-full border-0 " : " text-primary"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6  h-6">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>

        </button>
      </Link>
      <Link href='/mylist' >

        <button variant="btn bg-base-100/40  ">
          {user ? (<div className="avatar ">
            <img src={user?.photoURL} alt={user?.uid} className='rounded-full border-t-2 border-b-2  border-secondary' />
          </div>) : <div className="text-primary"><AiOutlineGoogle className="w-6 h-6" /> </div>}
        </button>

      </Link>
      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active :  text-secondary  bg-base-100/40 rounded-r-full border-0 " : " text-primary"}>    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6  h-6 scale-[125%]">
          <path d="M6.5 9a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 102.248 7.309l1.472 1.471a.75.75 0 101.06-1.06l-1.471-1.472A4 4 0 009 5z" clipRule="evenodd" />
        </svg>


        </button>
      </Link>


    </div >
  )
}

export default BottomNavbar;
