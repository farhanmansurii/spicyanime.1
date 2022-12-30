import parse from 'html-react-parser';
import Link from "next/link";
import React from "react";
export const Banner = ({ titles, description, imageban, id }) => {
  return (
    <div
      className=" font h-[32vh] mx-auto  lg:h-[55vh] space-y-2   md:space-y-4 justify-end  z-0   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${imageban}")`, }}
    >
      <div className="   bg-gradient-to-t from-secondary/50 to-black/20 h-full flex flex-col-reverse     px-5 ">
        <div className="m-4">

          <h1 className=" font-damion justify-center capitalize text-shadow-4xl  text-primary text-3xl  md:text-4xl   lg:text-6xl ">
            {titles}
          </h1>
          <div className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-md  text-primary/80 lg:max-w-2xl lg:text-lg my-2 line-clamp-2">
            {parse(`
                    Synopsis : ${description}
                 `
            )}
          </div>
          <div className="flex">
            <Link href={`/details?id=${id}`}><div className="  font-damion  hover:scale-95 duration-150 hover:bg-secondary-focus  px-6 py-3 rounded-full bg-secondary uppercase text-primary ">
              Play
            </div></Link>

          </div>
        </div>
      </div>
    </div>
  )
}
