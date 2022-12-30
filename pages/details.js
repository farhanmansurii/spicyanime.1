/* eslint-disable react-hooks/rules-of-hooks */
import dynamic from "next/dynamic";
import React from "react";
import Spinner from "react-spinner-material";
import Animedetails from "../components/Animedetails";
import Row from "../components/Row";
const Episodes = dynamic(() => import("../components/Episodes"), {
  loading: () => <div className='w-fit h-full ease-in-out duration-200 grid justify-center mx-auto place-content-center'>

    <Spinner radius={30} color='#DA0037' stroke={5} visible={true} />
  </div>
  , ssr: false
});
function details({ deets, setwatchlist, watchlist, contwatch, setcontwatch, epi, user, related, animen }) {
  console.log(epi)
  console.log(deets)
  return (
    <>

      {!deets ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails deets={deets} animen={animen} epi={epi} watchlist={watchlist} contwatch={contwatch} setcontwatch={setcontwatch} setwatchlist={setwatchlist} user={user} />
        </div>
      )}
      {epi.length >= 1 ?
        (

          <div className=" w-full mx-auto">


            <Episodes deets={deets} contwatch={contwatch} setcontwatch={setcontwatch} user={user} watchlist={watchlist} setwatchlist={setwatchlist} epi={epi} />

          </div>
        ) : (<div className="mx-auto text-2xl font-damion place-text-center my-6 text-center text-primary ">No episodes</div>)
      }


      <Row typeOfAnime={related} text="Recommendations " />
    </>
  );
}
export async function getServerSideProps(context) {
  const animen = context.query.id;
  const deets = await fetch(
    `https://api.amvstr.ml/api/v2/info/${animen}`
  ).then((res) => res.json());
  const epi = await fetch(
    `https://api.amvstr.ml/api/v2/episode/${animen}`
  ).then((res) => res.json());

  const related = await fetch(
    `https://api.amvstr.ml/api/v2/recommendations/${animen}`
  ).then((res) => res.json());



  return {
    props: {
      deets: deets.data, animen, epi, related: related.data
    },
  };
}

export default details;
