import Link from "next/link";
import React from "react";

function AnimeCard({ animeImg, title, id, extratext }) {
  return (
    <>
      <Link href={`/details?id=${id}`}>
        <div
          className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px] z-10 border-secondary hover:border-4    min-w-[110.67px] min-h-[170.60px]  max-w-[110.67px] max-h-[170.60px]    lg:w-[142px] lg:h-[213.60px] bg-center bg-no-repeat whitespace-nowrap "
          style={{ backgroundImage: `url(${animeImg})` }}
        >
          <div className=" bg-gradient-to-t mt-30 rounded-[8px] from-base-100 flex flex-col-reverse to-black/20 h-full">
            <div className="flex flex-row justify-between my-4">
              <div className="text-primary capitalize text-shadow-xl text-sm lg:text-xl whitespace-pre-wrap  mx-2  line-clamp-3">
                {title}
              </div>
            </div>
          </div>

        </div>
      </Link>
    </>
  )
}

export default AnimeCard;
