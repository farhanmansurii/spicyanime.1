import Link from "next/link";
import React from "react";

function AnimeCard({ animeImg, title, id, }) {
  return (
    <>
      <Link href={`/details?id=${id}`}>
        <div
          className="flex flex-col-reverse bg-cover ease-in  transition duration-100 transform   z-10 border-secondary hover:border-2    min-w-[110.67px] min-h-[170.60px]  max-w-[110.67px] max-h-[170.60px]    lg:w-[142px] lg:h-[213.60px] bg-center bg-no-repeat whitespace-nowrap "
          style={{ backgroundImage: `url(${animeImg})` }}
        >
          <div className=" bg-gradient-to-t  from-base-100 justify-between   min-h-full flex flex-col-reverse to-transparent ">
            <div className="flex flex-row justify-between my-3 ">
              <div className="text-primary capitalize text-shadow-xl text-md  line-clamp-2 whitespace-pre-wrap  mx-2  ">
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
