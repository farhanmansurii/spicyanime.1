import Link from "next/link";
import React from "react";

function AnimeCard({ animeImg, title, id, rating }) {
  return (
    <>
      <Link href={`/details?id=${id}`}>
        <div
          className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px] z-10 border-secondary hover:border-4 min-w-[148px]   max-w-[148px] h-[213.60px] bg-center bg-no-repeat whitespace-nowrap "
          style={{ backgroundImage: `url(${animeImg})` }}
        >
          <div className=" bg-gradient-to-t mt-30 rounded-[8px] from-base-100 flex flex-col-reverse to-black/20 h-full">
            <div className="flex flex-row justify-between my-4">
              <div className="text-primary text-shadow-xl text-sm lg:text-xl whitespace-pre-wrap  mx-2  line-clamp-3">
                {title}
              </div>
              <div className=" text-black  py-1 px-2  rounded-lg  text-xs w-fit mr-2  h-fit p-2rounded-2xl place-self-end  ">

              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default AnimeCard;
