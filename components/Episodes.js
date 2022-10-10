import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import EpisodeCard from './EpisodeCard'
const Episodes = ({ epi, deets }) => {
  const [eplink, seteplink] = React.useState()
  const [epid, setepid] = React.useState(deets.episodes[0].id || '')
  function epfetch() {
    fetch(
      "https://api.consumet.org/meta/anilist/watch/" + epid)
      .then((res) => res.json())
      .then((json) => {
        seteplink(json.sources[1].url)
      });
  }
  useEffect(() => {
    epfetch()

    return () => {
    }
  }, [epid])
  console.log(eplink)

  return (<>
    <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
      <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2"  >Ep number</div> : <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2">{deets.title.english}</div>
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
      {epi.map((e) => (<div onClick={() => { setepid(e.id), console.log(e.id) }}>

        <EpisodeCard episode={e} key={e.id} id={e.id} />
      </div>
      ))}
    </div>
  </>
  )
}

export default Episodes
