import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdClear, MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineNavigateNext } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { PulseLoader } from 'react-spinners';
import { db } from './config/firebase';
import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets, user, contwatch, setcontwatch }) => {
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const [eplink, seteplink] = React.useState(epqual?.url)
  const [epqual, setepqual] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || deets.episode[1].id)
  const [episodedeets, setepisodedeets] = useState({ number: deets.episodes[0].number, title: deets.episodes[0].title, description: epi[0].description } || { number: deets.episodes[1].number, title: deets.episodes[1].title, description: epi[1].description })
  function epfetch() {
    fetch(
      "https://api.consumet.org/anime/gogoanime/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        setepqual(json.sources)
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
    contwatching(nextep[0])
    setcurr(curr + 1)
  }
  const animeRef = doc(db, 'users', `${user?.email}`);


  const contwatching = async (e) => {
    const data = {
      number: e.number,
      title: e.title,
      description: e.description,
      image: e.image, epid: e.id,
      id: deets.id, eptitle: deets.title.english || deets.title.userPreferred || deets.title.romaji
    }
    if (user?.email) {

      await updateDoc(animeRef, {
        continue: arrayUnion(

          data

        )
      })
    }
  }
  const clearcontwatching = async (e) => {

    if (user?.email) {

      await updateDoc(animeRef, {
        continue: []
      })
    }
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
          <label tabIndex={0} className="btn btn-sm  btn-circle btn-ghost text-primary "><AiOutlineSetting className="w-5 h-5" /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit">
            {epqual?.map((e, index) => <li key={index} className='text-primary text-xs'><div onClick={() => seteplink(e.url)}  >{e.quality}</div></li>)}
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


    {user &&
      <>
        {contwatch?.length > 0 &&
          <div className='flex flex-auto justify-between ml-2  my-5 text-2xl font-damion  text-primary whitespace-nowrap '>

            <div className="text-xl  hover:text-2xl duration-200 font-damion my-auto text-primary whitespace-nowrap ">
              Continue Watching ?
            </div>
            <button className='btn text-xl hover:rotate-90 hover:scale-110 hover:text-2xl duration-300   btn-circle btn-ghost font-normal  lowercase  border-0 text-primary' onClick={clearcontwatching}>
              <MdClear /> </button>
          </div>
        }
        <div className=" flex overflow-x-scroll  scrollbar-hide  mx-auto my-3rem ">

          {contwatch?.map((e) =>
            e.id === deets.id &&
            <div onClick={() => {

              setepisodedeets({ number: e.number, title: e.title, description: e.description }),
                setepid(e.epid)
              setcurr(e.number)
            }} key={e.epid}>

              <EpisodeCard episode={e} />
            </div>
          )}

        </div>
      </>}
    <div className='flex flex-row w-full  my-4'>


      {deets.totalEpisodes > 25 && (<div className="btn-group hover:bg-transparent btn-ghost align-end  w-10/12   ">
        {initial !== 0 ? (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}><MdOutlineArrowBack className='w-6 h-6' /></button>) : (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowBack className='w-6 h-6' /></button>)}

        {final < deets.totalEpisodes ? (<button className=" btn btn-primary border-0 hover:bg-secondary  bg-base-100    text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} ><MdOutlineArrowForward className='w-6 h-6' /></button>) : (<button className="btn btn-primary-focus border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowForward className='w-6 h-6' /></button>)}
      </div>)}
      <div className=" my-auto  mx-2 text-2xl font-damion  text-primary whitespace-nowrap ">
        Episode {initial + 1} - {final < epi.length ? final + 1 : epi.length}
      </div>
    </div>
    <div className=" flex overflow-x-scroll m-1 p-1 scrollbar-hide ">
      {epi.slice(initial, final).map((e) => (
        <motion.ul key={e.id} className="item" variants={item} >
          <div key={e.id} className="flex my-3 flex-col-reverse bg-cover ease-in transition duration-100  transform sm:hover:scale-105  rounded-[10px]  h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 " onClick={() => { seteplink(''), setepid(e.id), setcurr(e.number), setepisodedeets({ number: e.number, title: e.title, description: e.description }), contwatching(e) }}>

            <EpisodeCard episode={e} id={e.id} user={user} />
          </div>
        </motion.ul>
      ))}
    </div>


  </>
  )
}

export default Episodes
