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
function details({ deets, setwatchlist, watchlist, user, related, animen }) {
  const [epi, setEpi] = useState([]);
  const [epIsLoading, setepIsLoading] = useState(<Spinner radius={30} color='#DA0037' stroke={5} visible={true} />);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodesResponse = await axios.get(`https://api.amvstr.ml/api/v2/episode/${animen}`);
        setepIsLoading('')
        setEpi(episodesResponse.data);
        console.log('lazy', episodesResponse.data);
      } catch (error) {
        setepIsLoading("No Episodes")
        console.error(error);
      }
    };
    fetchData();
  }, [animen]);

  return (
    <>

      {!deets ? (<div>No Data Found</div>) : (
        <div className=" flex-column  ">
          <Animedetails deets={deets} animen={animen} epi={epi} watchlist={watchlist} setwatchlist={setwatchlist} user={user} />
        </div>
      )}
      {epi.length >= 1 ?
        (

          <div className=" w-full mx-auto">


            <Episodes deets={deets} user={user} watchlist={watchlist} setwatchlist={setwatchlist} epi={epi} />

          </div>
        ) : (<div className="mx-auto text-2xl font-damion place-text-center my-6 text-center text-primary ">{epIsLoading}</div>)
      }

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
        related: related.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }
}


export default details;
