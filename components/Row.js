import React from 'react';
import AnimeCard from './AnimeCard';
const Row = ({typeOfAnime , text}) => {
  return ( <div className='w-10/12 mx-auto my-6'>
    <div className="text-2xl font-semibold my-3"> {text}</div>
    <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
    {typeOfAnime.map((e)=>
      <AnimeCard  key={e.id} animeImg={e.image} title={e.title.english || e.title.userPreferred} id={e.id}  />
      )}
      </div>
      </div>
  )
}


export default Row
