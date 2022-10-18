/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React from "react";
import Animedetails from "../components/Animedetails";
const Episodes = dynamic(() => import("../components/Episodes"), {
  loading: () => <div className="mx-auto text-2xl place-text-center my-6 text-center text-primary ">loading</div>
  , ssr: false
});
function details({ deets, setwatchlist, watchlist, contwatch, setContwatch, user }) {
  const epi = deets.episodes

  return (
    <>
      {!deets ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails deets={deets} watchlist={watchlist} contwatch={contwatch} setContwatch={setContwatch} setwatchlist={setwatchlist} user={user} />
        </div>
      )}

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
