import React from 'react'

const EpisodeCard = ({ episode }) => {
  return (<>
    <div
      className=" bg-cover h-[200px] w-[300px] m-2 "
      style={{ backgroundImage: `url(${episode.image})` }}

    >
      <div className=" flex flex-col-reverse  p-4 bg-gradient-to-t   h-full from-base-100 to-transparent w-[300px]  bg-cover ">
        <div className="self-bottom text-sm  line-clamp-2 text-primary mx-2 whitespace-wrap ">
          {episode.description}
        </div>
        <div className="self-bottom font-semibold text-primary bg-transparent text-md mx-2 text-shadow-xl whitespace-pre-wrap line-clamp-3">
          Ep {episode.number} : {episode.title}
        </div>
      </div>
    </div>
  </>

  )
}

export default EpisodeCard
