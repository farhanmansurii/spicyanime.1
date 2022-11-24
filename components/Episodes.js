import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { MdClear, MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineNavigateNext } from 'react-icons/md';
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
  const [eplink, seteplink] = React.useState()
  const [epqual, setepqual] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || deets.episode[1].id)
  const [episodedeets, setepisodedeets] = useState({ number: deets.episodes[0].number, title: deets.episodes[0].title, description: epi[0].description } || { number: deets.episodes[1].number, title: deets.episodes[1].title, description: epi[1].description })
  function epfetch() {
    fetch(
      "https://api.amvstr.ml/api/v2/stream?id=" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.plyr.main || json.nspl.main || json.plyr.backup || json.nspl.backup)
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
    <div className=" place-self-center my-5 w-full   border-t-2 border-secondary bg-base-100-focus mx-auto whitespace-wrap ">
      <div className='flex flex-auto  space-x-3 justify-between mx-5 my-2 lg:p-3'>
        <div>
          {deets.type !== "MOVIE" ? (<div className=" mx-auto text-md lg:text-xl  text-primary font-damion normal-case line-clamp-2"  > Ep {episodedeets.number} : {" "}{episodedeets.title} </div>
          ) : <div className=" mx-auto my-auto text-mdlg:text-xl text-primary font-damion normal-case line-clamp-2" > Movie</div>}
        </div>

        {deets.totalEpisodes > curr && <div className='w-fit btn  btn-sm font-normal  text-primary rounded-none normal-case font-damion bg-base-100/50  text-md my-auto border-secondary-focus border-2' onClick={() => { seteplink(''), nextep() }}> Ep {curr + 1} <MdOutlineNavigateNext /></div>
        }</div>

      {eplink ?

        <iframe src={eplink} className='w-[97%] rounded-xl aspect-video lg:w-[720px] lg:h-[405px] mx-auto'
        />
        :
        <div className='w-full aspect-video lg:max-w-[720px] lg:max-h-[405px] mx-auto'>
          <PulseLoader

            color="red"
            cssOverride={override}
            size={10}
          />
        </div>
      }
    </div>


    {user &&
      <>
        {contwatch?.length > 0 &&
          <div className='flex flex-auto justify-between   w-10/12 mx-auto  my-5 text-2xl font-damion  text-primary whitespace-nowrap '>

            <div className="text-xl   hover:text-2xl duration-200 font-damion my-auto text-primary whitespace-nowrap ">
              Continue Watching ?
            </div>
            <button className='btn text-xl hover:rotate-90 hover:scale-110 hover:text-2xl duration-300   btn-circle btn-ghost font-normal  lowercase  border-0 text-primary' onClick={clearcontwatching}>
              <MdClear /> </button>
          </div>
        }
        <div className=" flex overflow-x-scroll w-10/12  scrollbar-hide  mx-auto my-3rem ">

          {contwatch?.map((e) =>
            e.id === deets.id &&
            <div onClick={() => {
              seteplink('')
              setepisodedeets({ number: e.number, title: e.title, description: e.description }),
                setepid(e.epid)
              setcurr(e.number)
            }} key={e.epid}>

              <div
                className="flex flex-col-reverse bg-cover ease-in transition duration-100 rounded-[10px] z-10 border-secondary hover:border-4   h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 "
                style={{ backgroundImage: `url(${e.image}) ` }}
              >
                <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t   h-full from-base-100 to-transparent w-full bg-cover ">
                  {e.isFiller ? (<div className="w-full text-center bg-secondary text-xs   rounded-md  font-semibold  py-1/2 text-primary">filler</div>
                  ) : (<div className="self-bottom text-sm  line-clamp-1 text-primary/50 whitespace-wrap  ">
                    {e.description}
                  </div>)
                  }
                  <div className="flex-row">

                    <div className="self-bottom  font-semibold  text-shadow-2xl text-primary bg-transparent text-sm lg:text-md  text-shadow-2xl whitespace-pre-wrap line-clamp-2">
                      Ep {e.number} : {e.title}</div>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </>}
    <div className='flex flex-row w-11/12 mx-auto  my-4'>


      {deets.totalEpisodes > 25 && (<div className="btn-group hover:bg-transparent btn-ghost align-end  w-10/12   ">
        {initial !== 0 ? (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}><MdOutlineArrowBack className='w-6 h-6' /></button>) : (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowBack className='w-6 h-6' /></button>)}

        {final < deets.totalEpisodes ? (<button className=" btn btn-primary border-0 hover:bg-secondary  bg-base-100    text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} ><MdOutlineArrowForward className='w-6 h-6' /></button>) : (<button className="btn btn-primary-focus border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowForward className='w-6 h-6' /></button>)}
      </div>)}
      <div className=" my-auto  mx-4 text-2xl font-damion   text-primary whitespace-nowrap ">
        Episode {initial + 1} - {final < epi.length ? final + 1 : epi.length}
      </div>
    </div>
    <div className=" flex overflow-x-scroll m-1 p-1 w-11/12 mx-auto scrollbar-hide ">
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
