/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React from "react";
import Animedetails from "../components/Animedetails";
import Episodes from "../components/Episodes";
import Related from "../components/Related";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
function details({ deets, setaddlist, addlist }) {
  const epi = deets.episodes


  return (
    <>
      {!deets ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails addlist={addlist} setaddlist={setaddlist} deets={deets} />
        </div>
      )}
      {deets.episodes.length >= 1 ?
        (

          <div className=" w-10/12 mx-auto">
            <Episodes deets={deets} epi={epi} setaddlist={setaddlist} addlist={addlist} />
          </div>
        ) : (<div className=" w-full mx-auto">No episodes</div>)
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
