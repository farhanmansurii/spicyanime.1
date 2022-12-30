import React from 'react';
import AnimeCard from './AnimeCard';
const Row = ({ typeOfAnime, text }) => {
  return (<div className='w-11/12 mx-auto my-10  '>
    {typeOfAnime ? (<div className="text-xl lg:text-3xl mx-2  my-3 text-primary font-damion "> {text}</div>) : ('')}
    <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-1 ">
      {typeOfAnime?.map((e) =>

        <AnimeCard key={e.id} animeImg={e.image || e.coverImage.large} title={e.title.userPreferred || e.title.english} extratext={e.rating} id={e.id} />
      )}
    </div>
  </div>
  )
}


export default Row
