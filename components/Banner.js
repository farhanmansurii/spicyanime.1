import React from "react";
export const Banner = ({ titles, description, imageban }) => {
  return (
    <div
      className="flex flex-col w-vw h-[30vh]  lg:h-[55vh] space-y-2  md:space-y-4 justify-end     bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${imageban}")` }}
    >
      <div className="bg-gradient-to-t  from-base-100 to to-transparent p-4 px-5">
        <h1 className=" justify-center text-3xl font-semibold md:text-4xl  lg:text-7xl ">
          {titles}
        </h1>
        <div className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-md   lg:max-w-2xl lg:text-lg my-2 line-clamp-4">
          {description}
        </div>
        <div className="flex space-x-3 my-2">
          <button className="btn btn-ghost normal-case text-lg bg-secondary">
            Play
          </button>

          <button className="btn btn-ghost normal-case text-lg bg-slate-300">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
