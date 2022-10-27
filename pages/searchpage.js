import React, { useEffect, useState } from "react";
import Row from "../components/Row";
const URL = "https://api.consumet.org/meta/anilist/";

const SearchPage = () => {
  const [val, setval] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    const getData = setTimeout(() => {
      fetch(URL + val)
        .then((response) => response.json())
        .then((animelist) => { setSearchList(animelist.results) });
    }, 1000)
    return () => getData;
  }, [val]);

  return (
    <>
      <div className="form-control  place-content-center">
        <div className="flex place-self-center mt-4  w-10/12 mx-auto    bg-secondary rounded-lg">
          <input type="text" placeholder="Search for Any Anime TV or Movie" className="input placeholder:text-primary input-bordered bg-secondary-focus input-secondary w-full" input={val} onChange={(e) => setval(e.target.value)} />
        </div>
        <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
          {
            val === '' ? (
              <div className="text-6xl text-primary w-8/12 mx-auto mt-10 font-damion capitalize "> what are you looking for buddy ?</div>
            ) : (

              <Row typeOfAnime={searchList} />
            )
          }

        </div>
      </div>
    </>
  )
}

export default SearchPage;
