import React, { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineNavigateNext } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { PulseLoader } from 'react-spinners';
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
        setepqual(json.sources)
        console.log(json.sources)
        seteplink(json.sources[json.sources.length - 2].url || json.sources[json.sources.length - 1].url)
      });
  }
  const override = {
    display: "flex",
    justifyItems: 'center',
    marginTop: "25%",
    marginLeft: '40%',
    marginBottom: "25%",
    borderColor: "red",
  };
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
    <div className=" place-self-center my-5 w-10/12 border-2 border-secondary bg-base-100-focus mx-auto whitespace-wrap ">
      <div className='flex flex-auto   space-x-3 justify-between mx-5 my-2 lg:p-3'>
        <div>
          {deets.type !== "MOVIE" ? (<div className=" mx-auto text-md lg:text-xl  text-primary font-damion normal-case line-clamp-2"  > Ep {episodedeets.number} : {" "}{episodedeets.title} </div>
          ) : <div className=" mx-auto my-auto text-mdlg:text-xl text-primary font-damion normal-case line-clamp-2" > Movie</div>}
        </div>
        <div className="dropdown my-auto">
          <label tabIndex={0} className="btn btn-sm btn-circle btn-ghost text-primary "><AiOutlineSetting className='w-10' /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {epqual.map((e) => <li><div onClick={() => seteplink(e.url)} className='text-primary' >{e.quality}</div></li>)}
          </ul>
        </div>
        {deets.totalEpisodes > curr && <div className='w-fit btn  btn-sm font-normal  text-primary  normal-case font-damion bg-base-100/50  text-md my-auto border-secondary-focus border-2' onClick={() => { seteplink(''), nextep() }}> Ep {curr + 1} <MdOutlineNavigateNext /></div>
        }</div>
      {eplink ?
        <ReactPlayer
          controls={true}
          width='100%'
          height='auto'
          url={eplink} />

        :
        <PulseLoader
          color="red"
          cssOverride={override}
          size={20}
        />
      }
    </div>

    <div className='flex flex-row w-full  my-4'>


      {deets.totalEpisodes > 25 && (<div className="btn-group hover:bg-transparent btn-ghost align-end  w-10/12   ">
        {initial !== 0 ? (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}><MdOutlineArrowBack className='w-6 h-6' /></button>) : (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowBack className='w-6 h-6' /></button>)}

        {final < deets.totalEpisodes ? (<button className=" btn btn-primary border-0 hover:bg-secondary  bg-base-100    text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} ><MdOutlineArrowForward className='w-6 h-6' /></button>) : (<button className="btn btn-primary-focus border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowForward className='w-6 h-6' /></button>)}
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
