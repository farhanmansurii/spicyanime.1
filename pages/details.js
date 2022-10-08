/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Animedetails from "../components/Animedetails";
import Related from "../components/Related";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
function details({ deets, }) {
  const epi = deets.episodes
  const [epid, setepid] = useState(epi[0].id);
  const [currep, setcurrep] = useState(epi[0].title);
  const [eplink, setEplink] = useState();
  const URL = "https://animeapi-demo.herokuapp.com/animix/watch/";
  const getURL = async () => {
    await fetch(URL + epid)
      .then((response) => response.json())
      .then((animelist) => {
        {
          setEplink(animelist.sources[0].file);
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
      {eplink &&
        <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
          {deets.type === 'TV' ? <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2"  >Ep {' '}{currep.number || epi[0]?.number} {currep.title || epi[0].title} </div> : <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2">{deets.title.english}</div>}
          <ReactPlayer
            controls={true}
            height='360'
            width='640'
            url={eplink || ''}
          />
        </div>
      }
      {(
        <div className=" w-10/12 mx-auto">
          {deets.type === "TV" ?
            (

              <div className="mt-10 text-xl  text-primary font-semibold">
                Episode List
              </div>
            ) : (<div className="mt-10 mx-auto p-5 text-xl  text-primary font-semibold">
              Movie
            </div>)
          }
          <div className=" flex overflow-x-scroll  scrollbar-hide ">
            {epi?.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  setepid(e.id)
                  setcurrep(e)
                }}
                className="m-2 bg-cover  min-w-[300px]  min-h-[200px] max-h-[200px] max-w-[300px]  transition duration-100 transform  ease-in sm:hover:scale-105 rounded-lg border-secondary hover:border-4 "
                style={{ backgroundImage: `url(${e.image})` }}
              >
                <div className=" flex flex-col-reverse  p-4 bg-gradient-to-t   h-full from-base-100 to-transparent   bg-cover ">

                  {deets.type === "TV" ?
                    (<>
                      <div className="self-bottom text-sm  line-clamp-2 text-primary mx-2 whitespace-wrap ">
                        {e.description}
                      </div>
                      <div className="self-bottom font-semibold text-primary bg-transparent text-md mx-2 text-shadow-xl whitespace-pre-wrap line-clamp-3">
                        Ep {e.number} : {e.title}
                      </div>
                    </>

                    ) :
                    (


                      <div className="self-bottom font-semibold text-primary bg-transparent backdrop-blur-sm text-md mx-2 text-shadow-xl primary space-pre-wrap line-clamp-3">
                        {e.title} Movie
                      </div>
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mb-[6rem] mt-[4rem] space-y-16">

        {deets.relations &&

          <Related relations={deets.relations} text="Related Anime " />}
        <Related relations={deets.recommendations} text="Users Also watched" />
      </div>
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
