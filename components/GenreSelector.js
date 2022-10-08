import { useRouter } from "next/router";
import React from "react";
import requests from "../pages/api/requests";
const GenreSelector = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex px-10 sm:px-20 whitespace-nowrap space-x-10 scrollbar-hide overflow-x-scroll text-2xl">
        {Object.entries(requests).map(([key, { title }]) => (
          <h2
            onClick={() => router.push(`anime/?genre=${key}`)}
            className=" mt-10 first:pl-24 last:pr-24 cursor-pointer  text-primary transition duration-100 transform hover:scale-125 hover:text-secondary active:text-red-500"
            key={key}
          >
            {title}
          </h2>
        ))}
      </div>
    </>
  );
};


export default GenreSelector;
