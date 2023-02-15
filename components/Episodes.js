import 'firebase/database';
import { doc } from 'firebase/firestore';
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-spinner-material';
import { addRecentlyWatched, removeRecentlyWatched, updateRecentlyWatched } from '../redux/reducers/recentlyWatchedReducer';
import { db } from './config/firebase';
import EpisodeCard from './EpisodeCard';
import Player from './Player';
const Episodes = ({ epi, deets, user, contwatch, setcontwatch }) => {
  const animeId = deets.id
  const dispatch = useDispatch();
  const recentlyWatched = useSelector(state => state.recentlyWatched);
  const handleAdd = (e) => {
    dispatch(addRecentlyWatched({
      item: {
        number: e.number,
        title: e.title,
        description: e.description,
        image: e.image, epid: e.id,
        id: deets.id, eptitle: deets.title.english || deets.title.userPreferred || deets.title.romaji
        , animeId
      }
    }));
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const [eplink, seteplink] = React.useState()
  const [isloading, setisloading] = React.useState()
  const [epid, setepid] = React.useState(epi[0].id || epi[1].id)
  const [episodedeets, setepisodedeets] = useState({ number: epi[0].number, title: epi[0].title, description: epi[0].description } || { number: epi[1].number, title: epi[1].title, description: epi[1].description })
  async function epfetch(epid) {
    await fetch(
      "https://api.consumet.org/anime/gogoanime/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources)

      });
  }
  const [list, setList] = useState(false);

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
    setepisodedeets({ number: nextep[0].number, title: nextep[0].title, description: nextep[0].description } || { number: epi[1].number, title: epi[1].title, description: epi[1].description }
    )

    setcurr(curr + 1)
    handleAdd(nextep[0])

  }
  const animeRef = doc(db, 'users', `${user?.email}`);



  const handleClick = () => {
    dispatch(removeRecentlyWatched({ animeId }));
  };

  useEffect(() => {
    const storedState = localStorage.getItem("recentlyWatched");
    if (storedState) {
      dispatch(updateRecentlyWatched(JSON.parse(storedState)));
    }
  }, []);
  useEffect(() => {
    epfetch(epid)
    return () => {
    }
  }, [epid])
  return (<>

    <div className=" place-self-center my-5 w-[97%]  aspect-video lg:w-[720px]      bg-base-100-focus mx-auto whitespace-wrap ">
      <div className='mx-auto w-auto'>

        {recentlyWatched?.map((e) =>
          e.animeId === animeId &&
          <div onClick={() => {
            seteplink('')
            setepisodedeets({ number: e.number, title: e.title, description: e.description }),
              setepid(e.epid)
            setcurr(e.number)
          }} key={e.epid} className='justify-around flex w-full'>
            <div className='bg-secondary p-3  text-primary rounded-3xl mb-2 text-sm lg:text-lg font-damion flex gap-3  '> Continue watching Ep {e.number} {e.title} ?
              <button onClick={handleClick} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              </button>
            </div>

          </div>
        )}
      </div>
      <div className='flex flex-auto  space-x-3 justify-between mx-5 my-2 lg:p-3'>
        <div>
          {deets.type !== "MOVIE" ? (<div className=" mx-auto text-md lg:text-xl  text-primary font-damion normal-case line-clamp-2"  > Ep {episodedeets.number} : {" "}{episodedeets.title} </div>
          ) : <div className=" mx-auto my-auto text-md lg:text-xl text-primary font-damion normal-case line-clamp-2" > Movie</div>}
        </div>

        {epi.length > curr && <div className='w-fit btn  btn-sm font-normal  text-primary rounded-none normal-case font-damion bg-base-100/50  text-md my-auto border-secondary-focus border-2' onClick={() => { seteplink(''), nextep() }}> Ep {curr + 1} <MdOutlineNavigateNext /></div>
        }</div>


      {eplink ?

        <div className='w-full aspect-video'>
          <Player handleVideoEnd={() => { seteplink(''), nextep() }}
            sources={eplink}
          />
        </div>

        :
        <div className='lg:w-[720px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center'>

          <Spinner radius={30} color='#DA0037' stroke={5} visible={true} />
        </div>
      }
    </div>


    {
      epi.length > 101 ? (

        <div className=' rounded-full w-fit p-2 bg-secondary my-5 px-5  flex gap-1  mx-auto text-lg lg:text-xl ' onClick={() => setList(!list)}>
          Switch to {
            !list ?
              <div> Grid view? </div> :
              <div> Detailed view?</div>
          }</div>
      ) : ''
    }
    {!list &&
      <>
        <div className='flex flex-row w-11/12 mx-auto  mt-10 mb-4'>


          {epi.length > 25 && (<div className="btn-group gap-2 hover:bg-transparent btn-ghost align-end  w-10/12   ">
            {initial !== 0 ? (<button className=" bg-secondary p-3 duration-100 hover:scale-95 hover:bg-secondary-focus rounded-full border-0      text-primary " onClick={() => { setinitial(initial - 24), setfinal(final - 24) }}><MdOutlineArrowBack className='w-6 h-6' /></button>) : (<button className="btn btn-primary border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowBack className='w-6 h-6' /></button>)}

            {final < epi.length ? (<button className=" bg-secondary hover:scale-95 hover:bg-secondary-focus  p-3 rounded-full border-0     text-primary " onClick={() => { setinitial(initial + 24), setfinal(final + 24) }} ><MdOutlineArrowForward className='w-6 h-6' /></button>) : (<button className="btn btn-primary-focus border-0  bg-base-100  hover:bg-secondary  text-primary/20 btn-disabled "><MdOutlineArrowForward className='w-6 h-6' /></button>)}
          </div>)}
          <div className="  mx-4 text-2xl font-damion   text-primary whitespace-nowrap ">
            Episode {initial + 1} - {final < epi.length ? final + 1 : epi.length}
          </div>
        </div>
        <div className=" flex overflow-x-scroll m-1 p-1 w-11/12 mx-auto scrollbar-hide ">

          {
            epi.slice(initial, final).map((e) => (
              <motion.ul key={e.id} className="item" variants={item} >
                <div key={e.id} className="flex mb-3 flex-col-reverse bg-cover   aspect-video w-[200px] lg:w-[300px] mx-[4px] " onClick={() => { seteplink(''), setepid(e.id), setcurr(e.number), setepisodedeets({ number: e.number, title: e.title, description: e.description }), handleAdd(e) }}>

                  <EpisodeCard episode={e} id={e.id} user={user} />
                </div>
              </motion.ul>

            ))
          }
        </div>
      </>
    }
    <div className='flex w-11/12 flex-wrap gap-2 mx-auto'>
      {epi.length > 101 && list && epi.reverse().map((e) =>

        <div key={e.id} onClick={() => { seteplink(''), setepid(e.id), setcurr(e.number), setepisodedeets({ number: e.number, title: e.title, description: e.description }), handleAdd(e) }} className='bg-secondary  p-2 w-10  justify-center grid' >{e.number}</div>)}
    </div>


  </>
  )
}

export default Episodes
