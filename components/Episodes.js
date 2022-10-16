import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { db } from "./config/firebase";
import EpisodeCard from './EpisodeCard';
const Episodes = ({ epi, deets, user }) => {
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

  const [data, setData] = useState([])
  const addcontinuewatching = async () => {

    try {
      await addDoc(collection(db, 'continueWatching'), data)
      console.log(data)
    } catch (err) {
      ''
    }
  }
  useEffect(() => {
    epfetch()

    return () => {
    }
  }, [epid])
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
      {epi.map((e) => (<div key={e.id} className='border-secondary rounded-lg hover:border-4 ' onClick={() => { setepid(e.id), setepisodedeets(e.number + ' ' + e.title), setData({ id: deets.id, number: e.number, title: e.title, description: e.title, image: e.image, user: user.uid }) }}>
        <EpisodeCard episode={e} id={e.id} user={user} />
      </div>
      ))}
    </div>
  </>
  )
}

export default Episodes
