import React from "react";
export const Banner = ({ titles, description, imageban }) => {
  return (
    <div
      className="flex flex-col w-vw h-[45vh]  lg:h-[55vh] space-y-2   md:space-y-4 justify-end  z-0   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${imageban}")` }}
    >
      <div className="bg-gradient-to-t  from-base-100 to to-transparent p-4 px-5 mt-10">
        <div className="w-10/12 mx-auto">

        <h1 className=" justify-center text-3xl font-semibold md:text-4xl  text-black  lg:text-6xl ">
          {titles}
        </h1>
        <div className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-md  text-black lg:max-w-2xl lg:text-lg my-2 line-clamp-2">
          {description}
        </div>
        <div className="flex space-x-3 my-2">
          <button className="btn btn-ghost normal-case text-lg bg-secondary">
            Play
          </button>

          <button className="btn btn-ghost normal-case text-lg bg-primary/40">
            More Info
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
