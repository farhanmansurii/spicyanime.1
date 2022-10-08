import Link from "next/link";
import React from "react";
export const Banner = ({ titles, description, imageban, id }) => {
  return (
    <div
      className="rounded-lg font h-[30vh] mx-auto  lg:h-[55vh] space-y-2   md:space-y-4 justify-end  z-0   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${imageban}")`, }}
    >
      <div className="bg-black/50 h-full flex flex-col-reverse   rounded-lg  px-5 ">
        <div className="m-4">

          <h1 className=" justify-center uppercase text-primary text-2xl font-semibold md:text-4xl   lg:text-6xl ">
            {titles}
          </h1>
          <div className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-md  text-primary/80 lg:max-w-2xl lg:text-lg my-2 line-clamp-2">
            {description}
          </div>
          <div className="flex space-x-3 ">
            <Link href={`/details?id=${id}`}><button className="btn btn-sm bg-secondary text-primary sm:btn-sm md:btn-md lg:btn-lg">
              Play
            </button></Link>

            <button className="btn btn-sm sm:btn-sm md:btn-md bg-primary text-secondary lg:btn-lg">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
