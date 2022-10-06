import { useRouter } from "next/router";
import React from "react";
import requests from "../pages/api/requests";
const GenreSelector = ({request}) => {
  console.log(request)
  const router = useRouter();
  return (
    <>
      <div className="flex py-3 px-10 sm:px-20 whitespace-nowrap space-x-10 scrollbar-hide overflow-x-scroll text-2xl">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            onClick={() => router.push(`anime/?genre=${key}`)}
            className=" mt-10 first:pl-24 last:pr-24 cursor-pointer  text-white transition duration-100 transform hover:scale-125 hover:text-gray-200 active:text-red-500"
            key={key}
          >
            {title}
          </h2>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const genre = context.query.genre;
  const request =requests.popular.url
  return {
    props: {
      request,
    },
  };
}
export default GenreSelector;
