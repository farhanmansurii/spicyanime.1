import React, { useEffect, useState } from "react";
import Row from "../components/Row";
const URL = "https://api.consumet.org/meta/anilist/";

const SearchPage = () => {
  const [val, setval] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    fetch(URL + val)
      .then((response) => response.json())
      .then((animelist) => setSearchList(animelist.results));

    return () => { };
  }, [val]);

  return (
    <>
      <div className="form-control  place-content-center">
        <div className="flex place-self-center mt-4 ">
          <input type="text" placeholder="Search Any Anime/Movie" input={val} onChange={(e) => setval(e.target.value)} className="input  input-ghost " />

        </div>
        <div></div>
        <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">

          <Row typeOfAnime={searchList} />

        </div>
      </div>
    </>
  )
}

export default SearchPage;
