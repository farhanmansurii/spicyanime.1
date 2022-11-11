/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineGoogle, AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
const BottomNavbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="btm-nav bg-secondary/20 backdrop-blur-md btm-nav-sm text-sm mb-[2rem] mx-auto rounded-full w-7/12 align-self-center font-bold fixed z-30 lg:hidden  " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active : bg-base-100/10 rounded-tl-3xl border-t-primary text-primary" : " text-primary"}>
          <AiOutlineHome className="w-4 h-4" />
        </button>
      </Link>
      <Link href='/mylist' >

        <button variant="btn  ">
          {user ? (<div className="avatar">
            <div className="w-9 rounded-full z-10   ring-primary/30 ring-2">
              <img src={user?.photoURL} alt={user?.uid} />
            </div>
          </div>) : <div className="text-primary"><AiOutlineGoogle className="w-6 h-6" /> </div>}
        </button>

      </Link>
      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active : bg-base-100/10 rounded-tr-3xl border-t-primary   text-primary" : "text-primary"}>

          <FiSearch className="w-4 h-4" />
        </button>
      </Link>


    </div >
  )
}

export default BottomNavbar;
