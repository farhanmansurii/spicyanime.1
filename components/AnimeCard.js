import Link from "next/link";
import React from "react";

function AnimeCard({ animeImg, title, id, }) {
  return (
    <>
      <Link href={`/details?id=${id}`}>
        <div
          className="flex flex-col-reverse bg-cover ease-in  transition duration-100 transform   z-10    min-w-[110.67px] min-h-[170.60px]  max-w-[110.67px] max-h-[170.60px]    lg:min-w-[200px] lg:min-h-[300.60px] bg-center bg-no-repeat whitespace-nowrap "
          style={{ backgroundImage: `url(${animeImg})` }}
        >
          <div className=" bg-gradient-to-t  from-base-100 justify-between  w-[100]%  min-h-full border-secondary hover:border-[2px] duration-100 ease-linear w-full flex flex-col-reverse to-transparent ">
            <div className="flex flex-row justify-between my-3 ">
              <div className="text-[#F1E0C5] capitalize text-shadow-xl text-sm md:text-md lg:text-lg   truncate line-clamp-3 whitespace-pre-wrap  mx-2  ">
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
