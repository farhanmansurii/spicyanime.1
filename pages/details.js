/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "react-spinner-material";
import Animedetails from "../components/Animedetails";
import Row from "../components/Row";
// const Episodes = dynamic(() => import("../components/Episodes"), {
//   loading: () => 
//   , ssr: false
// });
import Episodes from "../components/Episodes";
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
      ) : (
        <div className='w-fit h-full ease-in-out duration-200 grid justify-center mx-auto place-content-center'>

          <Spinner radius={30} color='#DA0037' stroke={5} visible={true} />
        </div>
      )}
      <div className="mb-24 lg:pb-10">


        <Row typeOfAnime={related} text="Recommendations " />
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const animeId = context.query.id;
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
}


export default details;
