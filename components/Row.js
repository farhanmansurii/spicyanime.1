import React from 'react';
import AnimeCard from './AnimeCard';
const Row = ({ typeOfAnime, text }) => {
  return (<div className='w-10/12 mx-auto my-3rem  '>
    {typeOfAnime ? (<div className="text-xl lg:text-3xl mx-3  my-3 text-primary font-damion "> {text}</div>) : ('')}
    <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
      {typeOfAnime.map((e) =>
        <AnimeCard key={e.id} animeImg={e.image} title={e.title.english || e.title.userPreferred} extratext={e.rating} id={e.id} />
      )}
    </div>
  </div>
  )
}


export default Row
