import parse from 'html-react-parser';
import Link from "next/link";
import React from "react";
export const Banner = ({ titles, description, imageban, id }) => {
  return (
    <div
      className=" font h-[32vh]  mx-auto  lg:h-[55vh] space-y-2   md:space-y-4 justify-end  z-0   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${imageban}")`, }}
    >
      <div className="   bg-gradient-to-t from-secondary/50 to-black/20 h-full flex flex-col-reverse     px-5 ">
        <div className=" m-2 lg:m-4">

          <h1 className=" font-damion justify-center uppercase text-shadow-4xl  text-primary text-3xl  md:text-4xl   lg:text-6xl ">
            {titles}
          </h1>
          <div className="max-w-xs   text-xs text-shadow-md md:max-w-lg md:text-md  text-primary/80 lg:max-w-2xl lg:text-lg my-2 line-clamp-2">
            {parse(`
                  ${description}
                 `
            )}
          </div>
          <div className="flex">
            <Link href={`/details?id=${id}`}><div className=" flex  font-damion  hover:scale-95 duration-150 hover:bg-secondary-focus  px-6 py-3 rounded-full bg-secondary gap-2 text-primary ">
              Play <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 my-auto">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>

            </div></Link>

          </div>
        </div>
      </div>
    </div>
  )
}
