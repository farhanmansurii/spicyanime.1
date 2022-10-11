import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets }) => {
  const [eplink, seteplink] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id)
  const [episodedeets, setepisodedeets] = useState(deets.episodes[0].number + ' ' + deets.episodes[0].title)
  function epfetch() {
    fetch(
      "https://animeapi-demo.herokuapp.com/animix/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources[0].file)
        console.log(json)
      });
  }
  useEffect(() => {
    epfetch()

    return () => {
    }
  }, [epid])
  const router = useRouter();
  return (<>
    <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
      <div className=" mx-auto p-5 text-md  text-primary font-semibold line-clamp-2"  > Ep {episodedeets}</div>
      <ReactPlayer
        controls={true}
        height='360'
        width='640'
        url={eplink} />
    </div>
    <div className="mt-10 text-xl  text-primary font-semibold">
      Episode List
    </div>
    <div className=" flex overflow-x-scroll  scrollbar-hide ">
      {epi.map((e) => (<div key={e.id} className='border-secondary rounded-lg hover:border-4 ' onClick={() => { setepid(e.id), setepisodedeets(e.number + ' ' + e.title) }}>
        <EpisodeCard episode={e} id={e.id} />
      </div>
      ))}
    </div>
  </>
  )
}

export default Episodes
