import React from "react";
import AnimeCard from "../components/AnimeCard";
import GenreSelector from "../components/GenreSelector";
import requests from "./api/requests";
const anime = ({ results }) => {

  return <div >  <GenreSelector />
    <div className="p-5 grid mx-auto my-10 grid-cols-2 gap-4 md:grid-cols-6 w-11/12 lg:w-10/12 mb-[6rem]">
      {results.map((e) => (
        <AnimeCard
          animeImg={e.image}
          title={e.title.english || e.title.native}
          key={e.malId}
          rating={e.rating}
          id={e.id}
        />
      ))}
    </div> </div>;
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const request = await fetch(requests[genre]?.url || requests.popular.url
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
export default anime;
