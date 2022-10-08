import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const BottomNavbar = () => {
  const [active, setactive] = useState(false)
  const router = useRouter();
  return (
    <div className="btm-nav bg-secondary text-xl font-bold fixed z-30 lg:hidden  " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active : bg-base-100 text-secondary" : " text-primary"}>
          Home
        </button>
      </Link>
      <Link href='/anime' >
        <button className={router.pathname == "/anime" ? "active : bg-base-100 text-secondary" : "text-primary"}>
          Anime
        </button>
      </Link>
      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active : bg-base-100 text-secondary" : "text-primary"}>
          Search
        </button>
      </Link>

    </div >
  )
}

export default BottomNavbar;
