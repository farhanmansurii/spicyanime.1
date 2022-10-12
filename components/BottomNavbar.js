import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const BottomNavbar = () => {
  const [active, setactive] = useState(false)
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
        <button className={router.pathname == "/mylist" ? "active : bg-base-100/10 border-t-primary rounded-tr-lg  text-primary" : "text-primary"}>
          My List
        </button>
      </Link>

    </div >
  )
}

export default BottomNavbar;
