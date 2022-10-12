import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
const BottomNavbar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="btm-nav bg-secondary text-md mb-[1rem] mx-[1rem] rounded-xl w-11/12 align-self-center font-bold fixed z-30 lg:hidden  " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active : bg-base-100/10 rounded-tl-lg border-t-primary text-primary" : " text-primary"}>
          Home
        </button>
      </Link>
      <Link href='/anime' >
        <button className={router.pathname == "/anime" ? "active : bg-base-100/10  border-t-primary text-primary" : "text-primary"}>
          Anime
        </button>
      </Link>
      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active : bg-base-100/10 border-t-primary   text-primary" : "text-primary"}>
          Search
        </button>
      </Link>
      <Link href='/mylist' >

        <button variant="unstyled">
          {user ? (<div className="avatar">
            <div className="w-7 rounded-full z-10 ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
          </div>) : <div>login</div>}
        </button>

      </Link>

    </div >
  )
}

export default BottomNavbar;
