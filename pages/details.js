/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React from "react";
import Animedetails from "../components/Animedetails";
import Related from "../components/Related";
const Episodes = dynamic(() => import("../components/Episodes"), {
  loading: () => <div className="mx-auto text-2xl place-text-center my-6 text-center text-primary ">loading</div>
  , ssr: false
});
function details({ deets, setwatchlist, watchlist, user }) {
  const epi = deets.episodes
  return (
    <>
      {!deets ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails deets={deets} watchlist={watchlist} setwatchlist={setwatchlist} user={user} />
        </div>
      )}
      {deets.episodes.length >= 1 ?
        (

          <div className=" w-10/12 mx-auto">
            <Episodes deets={deets} epi={epi} user={user} />
          </div>
        ) : (<div className="mx-auto text-2xl place-text-center my-6 text-center text-primary ">No episodes</div>)
      }
      {deets.relations &&
        <div className="pb-16 lg:pb-3">

          <Related relations={deets.relations} text="Related Anime " />
          <Related relations={deets.recommendations} text="Recommendations " />
        </div>}
    </>
  );
}
export async function getServerSideProps(context) {
  const animen = context.query.id;
  const deets = await fetch(
    "https://api.consumet.org/meta/anilist/info/" + animen
  ).then((res) => res.json());



  return {
    props: {
      deets,
    },
  };
}

export default details;
