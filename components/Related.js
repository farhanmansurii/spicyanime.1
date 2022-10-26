import React from 'react'
import AnimeCard from './AnimeCard'
const Related = ({ relations, text }) => {
  console.log(relations)
  return (<>

    <div className='w-10/12 mx-auto my-6 '>
      <div className="  mx-2 text-xl font-damion  text-primary ">
        {text}
      </div>
      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
        {relations.map((e) => (

          e.type === "TV" &&
          <div key={e.id} >

            <div className='text-center  my-2 text-primary  lowercase bg-red-500 rounded-2xl  p-1'>
              {e.relationType}</div>
            < AnimeCard
              key={e.id}
              animeImg={e.image}
              title={e.title.userPreferred || e.title.english}
              id={e.id} extratext={e.relationType}
            />
          </div>
        ))}
        {relations.map((e) => (

          e.type === "MOVIE" &&
          <div key={e.id} >
            <div className='text-center font-xs my-2 text-primary  lowercase bg-red-500 rounded-2xl  p-1'>
              {e.relationType}</div>
            < AnimeCard

              animeImg={e.image}
              title={e.title.english || e.title.userPreferred}
              id={e.id}

            />

          </div>

        ))}
      </div>
    </div>


  </>
  )
}

export default Related
