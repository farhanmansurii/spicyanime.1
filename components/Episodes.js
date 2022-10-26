import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineNavigateNext } from 'react-icons/md';
import { Rings } from 'react-loader-spinner';
import ReactPlayer from 'react-player';
import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets, user }) => {
  console.log(deets)

  const [eplink, seteplink] = React.useState(epqual?.url)
  const [epqual, setepqual] = React.useState()
  const [epqualities, setepqualities] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || deets.episode[1].id)
  const [episodedeets, setepisodedeets] = useState({ number: deets.episodes[0].number, title: deets.episodes[0].title, description: epi[0].description } || { number: deets.episodes[1].number, title: deets.episodes[1].title, description: epi[1].description })
  function epfetch() {
    fetch(
      "https://api.consumet.org/anime/gogoanime/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources[json.sources.length - 3].url || json.sources[json.sources.length - 2].url || json.sources[json.sources.length - 1].url)
      });
  }
  console.log()
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
    <div className=" place-self-center my-5 w-10/12 bg-base-100-focus border-2 border-secondary mx-auto whitespace-wrap ">
      <div className='flex flex-auto justify-between mx-5 my-2'>
        <div>
          {deets.type !== "MOVIE" ? (<div className=" mx-auto pt-5 px-5 text-md  text-primary font-damion normal-case line-clamp-2"  > Episode {episodedeets.number} : {" "}{episodedeets.title} </div>
          ) : <div className=" mx-auto pt-5 px-5 text-md  text-primary font-damion normal-case line-clamp-2" > Movie</div>}
        </div>
        {deets.totalEpisodes > curr && <div className='w-fit btn  btn-sm font-normal  text-primary  normal-case font-damion bg-base-100/50 border-0 text-md mt-auto' onClick={() => { seteplink(''), nextep() }}>Next episode  <MdOutlineNavigateNext /></div>
        }</div>
      {eplink ?
        <ReactPlayer
          controls={true}
          width='100%'
          height='100%'
          url={eplink} />
        : <Rings
          color="#DA0037"
          radius="2"
          height={180}

          width='fit'

          wrapperStyle={{ width: '100%', height: 'inherit' }}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      }
    </div>

    <div className='flex flex-row w-full  my-4'>


      {deets.totalEpisodes > 25 && (<div className="btn-group hover:bg-transparent btn-ghost align-end  w-10/12   ">
        {initial !== 0 && <button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}><MdOutlineArrowBack className='w-8 h-8' /></button>}

        {final < deets.totalEpisodes && (<button className=" btn btn-primary border-0 hover:bg-secondary  bg-base-100    text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} ><MdOutlineArrowForward className='w-8 h-8' /></button>)}
      </div>)}
      <div className=" my-auto  mx-2 text-2xl font-damion  text-primary whitespace-nowrap ">
        Episode {initial + 1} - {final < epi.length ? final + 1 : epi.length}
      </div>
    </div>
    <div className=" flex overflow-x-scroll  scrollbar-hide ">
      {epi.slice(initial, final).map((e) => (<div key={e.id} className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px]  h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 " onClick={() => { seteplink(''), setepid(e.id), setcurr(e.number), setepisodedeets({ number: e.number, title: e.title, description: e.description }) }}>
        <EpisodeCard episode={e} id={e.id} user={user} />
      </div>
      ))}
    </div>


  </>
  )
}

export default Episodes
