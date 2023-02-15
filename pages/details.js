/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Spinner from "react-spinner-material";
import Animedetails from "../components/Animedetails";
import Row from "../components/Row";
const Episodes = dynamic(() => import("../components/Episodes"), {
  loading: () => <div className='w-fit h-full ease-in-out duration-200 grid justify-center mx-auto place-content-center'>

    <Spinner radius={30} color='#DA0037' stroke={5} visible={true} />
  </div>
  , ssr: false
});
function details({ deets, setwatchlist, watchlist, user, related, animen, notFound }) {
  const [epi, setEpi] = useState([]);
  const [epIsLoading, setepIsLoading] = useState(<Spinner radius={30} color='#DA0037' stroke={5} visible={true} />);
  const fetchData = async () => {
    try {
      const episodesResponse = await axios.get(`https://api.amvstr.ml/api/v2/episode/${animen}`);
      setepIsLoading('')
      setEpi(episodesResponse.data);
    } catch (error) {
      setepIsLoading("No Episodes")
      console.error(error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [animen]);

  return (
    <>

      {notFound ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails deets={deets} animen={animen} epi={epi} watchlist={watchlist} setwatchlist={setwatchlist} user={user} />
        </div>
      )}
      {epi.length > 0 ? (
        <div className="w-full mx-auto">
          <Episodes deets={deets} user={user} watchlist={watchlist} setwatchlist={setwatchlist} epi={epi} />
        </div>
      ) : epi.length === 0 ? (
        <div className="mx-auto text-2xl font-damion place-text-center my-6 text-center text-primary">No Data Found <button onClick={() => fetchData()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        </button></div>
      ) : (
        <div className="mx-auto text-2xl font-damion place-text-center my-6 text-center text-primary">Loading episodes</div>
      )}
      <div className="mb-24 lg:pb-10">


        <Row typeOfAnime={related} text="Recommendations " />
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const animeId = context.query.id;

  try {
    const detailsResponse = await fetch(`https://api.amvstr.ml/api/v2/info/${animeId}`);
    const details = await detailsResponse.json();


    const relatedResponse = await fetch(`https://api.amvstr.ml/api/v2/recommendations/${animeId}`);
    const related = await relatedResponse.json();

    return {
      props: {
        deets: details.data,
        animen: animeId,
        notFound: false,
        related: related.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true
      , animen: animeId
    };
  }
}


export default details;
