import React, { useEffect, useState } from "react";
import Row from "../components/Row";
import useDebounce from "../hooks/useDebounce";
const URL = "https://api.consumet.org/meta/anilist/advanced-search?query=[%22naruto%22]&perPage=6";
const SearchPage = () => {
  const [val, setval] = useState("");
  const [searchList, setSearchList] = useState([]);
  const debouncedSearch = useDebounce(val, 1000);
  useEffect(() => {
    async function fetchData() {

      const data = await fetch(
        `https://api.consumet.org/meta/anilist/advanced-search?query=${debouncedSearch}`
      ).then((res) => res.json());
      setSearchList(data.results);
      console.log(data.results)
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

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
