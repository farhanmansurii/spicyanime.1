import React, { useEffect, useState } from "react";
import Spinner from "react-spinner-material";
import Row from "../components/Row";
import useDebounce from "../hooks/useDebounce";
const SearchPage = () => {
  const [val, setval] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isloading, setisloading] = useState(true)
  const debouncedSearch = useDebounce(val, 500);
  useEffect(() => {
    async function fetchData() {
      setisloading(true)
      const data = await fetch(
        `https://api.amvstr.ml/api/v2/search?q=${debouncedSearch}&page=1&limit=10`
      ).then((res) => res.json());
      setSearchList(data.results);
      setisloading(false)
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <>
      <div className="form-control  place-content-center">
        <div className="flex place-self-center mt-4  w-10/12 mx-auto   ">
          <input type="text" placeholder="Search for Any Anime TV or Movie" className=" placeholder:text-primary p-4 rounded-full w-full backdrop-blur-sm bg-secondary/20    outline-none border-secondary active:border-0" input={val} onChange={(e) => setval(e.target.value)} />
        </div>
        <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
          {
            val === '' ? (
              <div className="text-6xl text-primary w-8/12 mx-auto mt-10 font-damion  "> Search for your favourite anime</div>
            ) : (

              !isloading ? (

                <Row typeOfAnime={searchList} />
              ) : (
                <div className='w-fit h-[200px] my-auto ease-in-out duration-200 grid justify-center mx-auto place-content-center'>
                  <Spinner radius={30} color='#DA0037' stroke={5} visible={true} />
                </div>
              )

            )
          }

        </div>
      </div>
    </>
  )
}

export default SearchPage;
