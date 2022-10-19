import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets, user }) => {
  console.log(deets)
  const [eplink, seteplink] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || deets.episode[1].id)
  const [episodedeets, setepisodedeets] = useState({ number: deets.episodes[0].number, title: deets.episodes[0].title, description: epi[0].description } || { number: deets.episodes[1].number, title: deets.episodes[1].title, description: epi[1].description })
  function epfetch() {
    fetch(
      "https://animeapi-demo.herokuapp.com/animix/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources[0].file ? json.sources[0].file : json.sources[1].file)
        console.log(json)
      });
  }

  const [initial, setinitial] = useState(0)
  const [final, setfinal] = useState(24)
  const [curr, setcurr] = useState(1)
  function nextep() {
    const nextep = epi.slice(curr, curr + 1)
    setepid(nextep[0].id)
    setepisodedeets({ number: nextep[0].number, title: nextep[0].title, description: nextep[0].description } || { number: deets.episodes[1].number, title: deets.episodes[1].title, description: epi[1].description }
    )
    setcurr(curr + 1)
  }
  useEffect(() => {
    epfetch()
    return () => {
    }
  }, [epid])
  return (<>
    <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
      <div className=" mx-auto pt-5 px-5 text-md  text-primary font-damion normal-case line-clamp-2"  > EP {episodedeets.number} :{episodedeets.title} </div>
      <div className='mx-auto px-5 text-2xs pb-5 text-primary/50  normal-case line-clamp-2' >
        {episodedeets.description}</div>
      <ReactPlayer
        controls={true}
        height='360'
        width='640'
        url={eplink} />
    </div>
    <div className='flex flex-row w-full '>


      {deets.totalEpisodes > 25 && (<div className="btn-group  w-10/12   ">
        {initial !== 0 && <button className="btn btn-sm border-primay hover:bg-secondary border-2 bg-secondary text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}>«</button>}
        {final < deets.totalEpisodes && (<button className="btn btn-ghost btn-sm  border-primay hover:bg-secondary border-2 bg-secondary text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} >»</button>)}
      </div>)}
      <div className="  mx-2 text-xl font-damion  text-primary whitespace-nowrap ">
        Episode {initial + 1} - {final < epi.length ? final + 1 : epi.length}
      </div>
    </div>
    <div className=" flex overflow-x-scroll  scrollbar-hide ">
      {epi.slice(initial, final).map((e) => (<div key={e.id} className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px]  h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 " onClick={() => { setepid(e.id), setepisodedeets({ number: e.number, title: e.title, description: e.description }) }}>
        <EpisodeCard episode={e} id={e.id} user={user} />
      </div>
      ))}
    </div>

    <button className='btn ' onClick={() => nextep()}>Ep {curr + 1} </button>

  </>
  )
}

export default Episodes
