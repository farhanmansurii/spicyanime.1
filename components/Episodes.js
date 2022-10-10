import React from 'react'
import ReactPlayer from 'react-player'
import EpisodeCard from './EpisodeCard'
const Episodes = ({ epi, deets }) => {
  console.log(epi, deets)
  return (<>
    <div className=" place-self-center my-5  w-fit bg-black/30 mx-auto whitespace-wrap ">
      <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2"  >Ep number</div> : <div className=" mx-auto p-5 text-md text-primary font-semibold line-clamp-2">{deets.title.english}</div>
      <ReactPlayer
        controls={true}
        height='360'
        width='640'
        url={''}
      />
    </div>
    <div className="mt-10 text-xl  text-primary font-semibold">
      Episode List
    </div>
    <div className=" flex overflow-x-scroll  scrollbar-hide ">
      {epi.map((e) => (
        <EpisodeCard episode={e} key={e.id} />
      ))}
    </div>
  </>
  )
}

export default Episodes
