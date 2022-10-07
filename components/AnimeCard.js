import Link from "next/link";
import React from "react";

function AnimeCard({ animeImg, title, id, rating }) {
  return (
    <>
      <Link href={`/details?id=${id}`}>
        <div
          className="flex flex-col-reverse bg-cover ease-in border-2 border-secondary transition duration-100 transform sm:hover:scale-105 rounded-lg hover:border-rose-500 min-w-[148px]   max-w-[148px] h-[213.60px] bg-center bg-no-repeat whitespace-nowrap "
          style={{ backgroundImage: `url(${animeImg})` }}
        >
          <div className=" bg-gradient-to-t mt-30 rounded-lg from-base-100 to-transparent">
            <div className="flex flex-row justify-between my-4">
              <div className="text-white text-2xl sm:text-xs whitespace-pre-wrap  mx-2  line-clamp-3">
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
