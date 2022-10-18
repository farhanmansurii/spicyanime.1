import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets, user, setContwatch, contwatch }) => {
  const [eplink, seteplink] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || deets.episode[1].id)
  const [episodedeets, setepisodedeets] = useState(deets.episodes[0].number + ' ' + deets.episodes[0].title)
  function epfetch() {
    fetch(
      "https://animeapi-demo.herokuapp.com/animix/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources[0].file)
      });
  }




  useEffect(() => {
    epfetch()
    return () => {
    }
  }, [epid])
  return (<>
    <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
      <div className=" mx-auto p-5 text-md  text-primary font-damion normal-case line-clamp-2"  > EP {episodedeets}</div>
      <ReactPlayer
        controls={true}
        height='360'
        width='640'
        url={eplink} />
    </div>

    <div className="  mx-2 text-xl font-damion  text-primary ">
      Episode List
    </div>
    <div className=" flex overflow-x-scroll  scrollbar-hide ">
      {epi.map((e) => (<div key={e.id} className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px]  h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 " onClick={() => { setepid(e.id), setepisodedeets(e.number + ' ' + e.title) }}>
        <EpisodeCard episode={e} id={e.id} user={user} />
      </div>
      ))}
    </div>
  </>
  )
}

export default Episodes
