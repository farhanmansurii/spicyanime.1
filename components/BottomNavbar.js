/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineGoogle, AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
const BottomNavbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="btm-nav bg-secondary text-md mb-[1rem] mx-[1rem] rounded-xl w-11/12 align-self-center font-bold fixed z-30 lg:hidden  " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active : bg-base-100/10 rounded-tl-lg border-t-primary text-primary" : " text-primary"}>
          <AiOutlineHome className="w-5 h-5" />
        </button>
      </Link>

      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active : bg-base-100/10 border-t-primary   text-primary" : "text-primary"}>

          <FiSearch className="w-5 h-5" />
        </button>
      </Link>
      <Link href='/mylist' >

        <button variant="unstyled">
          {user ? (<div className="avatar">
            <div className="w-5 rounded-full z-10 ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt={user?.uid} />
            </div>
          </div>) : <div className="text-primary"><AiOutlineGoogle className="w-6 h-6" /> </div>}
        </button>

      </Link>

    </div >
  )
}

export default BottomNavbar;
