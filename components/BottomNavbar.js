import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const BottomNavbar = () => {
  const [active, setactive] = useState(false)
  const router = useRouter();
  return (
    <div className="btm-nav backdrop-blur-sm fixed z-30 lg:hidden " >
      <Link href='/' >
        <button className={router.pathname == "/" ? "active" : ""}>
          Home
        </button>
      </Link>
      <Link href='/anime' >
        <button className={router.pathname == "/anime" ? "active" : ""}>
          Anime
        </button>
      </Link>
      <Link href='/searchpage' >
        <button className={router.pathname == "/searchpage" ? "active" : ""}>
          Search
        </button>
      </Link>

    </div >
  )
}

export default BottomNavbar;
