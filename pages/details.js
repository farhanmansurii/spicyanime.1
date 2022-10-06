/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Animedetails from "../components/Animedetails";
import Related from "../components/Related";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
function details({ deets, }) {
  const epi = deets.episodes
  const [epid, setepid] = useState(epi[0].id);
  const [eplink, setEplink] = useState();
  const [eptitle, setEptitle] = useState(epi[0].number);
  const URL = "https://animeapi-demo.herokuapp.com/animix/watch/";
  console.log(eptitle)
  const getURL = async () => {
    await fetch(URL + epid)
      .then((response) => response.json())
      .then((animelist) => {
        for (const key in animelist.sources) {
          setEplink(animelist.sources[key].file);
        }
      });
  };

  useEffect(() => {
    getURL();
    return () => { };
  }, [epid]);
  return (
    <>
      {deets && (
        <div className=" flex-column  ">
          <Animedetails deets={deets} />
        </div>
      )}
      {
        <div className=" place-self-center my-5 w-[300px] bg-black/30 mx-auto whitespace-wrap ">
          <div className=" mx-auto p-5 text-md text-white font-semibold line-clamp-2"  >Ep  {eptitle}</div>
          <ReactPlayer
            controls={true}
            height={168.8}
            width={300}
            url={eplink || ''}
          />
        </div>
      }<button onClick={
        () => setEptitle(eptitle + 1)
      }>CLick on next</button>
      {deets.type === "TV" && (
        <div className="my-10 mx-auto p-5 text-xl  text-white font-semibold">
          Episode List
          <div className=" flex overflow-x-scroll  scrollbar-hide ">
            {epi?.map((e, index) => (
              <div
                key={e.id}
                onClick={() => {
                  setepid(e.id)
                  setEptitle(e.number + ' ' + e.title)
                }}
                className="m-2 bg-cover h-[200px] w-[300px] "
                style={{ backgroundImage: `url(${e.image})` }}
              >
                <div className=" flex flex-col-reverse   bg-gradient-to-t mt-30  h-full from-black to-transparent w-[220px]  bg-cover ">
                  <div className="self-bottom text-sm line-clamp-2 text-white mx-2 whitespace-wrap ">
                    {e.description}
                  </div>
                  <div className="self-bottom font-semibold text-white bg-transparent backdrop-blur-sm text-md mx-2 text-shadow-xl whitespace-pre-wrap line-clamp-3">
                    Ep {e.number} : {e.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {deets.relations.length && <>

        <Related relations={deets.relations} text="Related Anime " />
        <Related relations={deets.recommendations} text="Users Also watched" />
      </>
      }</>
  );
}
export async function getServerSideProps(context) {
  const animen = context.query.id;
  const deets = await fetch(
    "https://api.consumet.org/meta/anilist/info/" + animen
  ).then((res) => res.json());
  // const epi = await fetch(
  //   "https://api.enime.moe/mapping/mal/ " + deets.malId
  // ).then((res) => res.json());


  return {
    props: {
      deets,
    },
  };
}

export default details;
