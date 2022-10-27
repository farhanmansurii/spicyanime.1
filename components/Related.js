import React from 'react'
import AnimeCard from './AnimeCard'
const Related = ({ relations, text }) => {
  return (<>

    <div className='w-10/12 mx-auto my-6 '>
      <div className="  mx-2 text-xl font-damion  text-primary ">
        {text}
      </div>
      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
        {relations.map((e) => (

          e.type === "TV" &&
          <div key={e.id} >

            <div className='text-center  hover:scale-105 text-xs w-fit my-2 text-primary  lowercase bg-secondary rounded-xl'>  {e.relationType}
              < AnimeCard
                key={e.id}
                animeImg={e.image}
                title={e.title.userPreferred || e.title.english}
                id={e.id} extratext={e.relationType}
              />
            </div></div>
        ))}
        {relations.map((e) => (

          e.type === "MOVIE" &&
          <div key={e.id} >
            <div className='text-center text-xs w-fit my-2 text-primary  lowercase bg-secondary rounded-xl'>  {e.relationType}
              < AnimeCard

                animeImg={e.image}
                title={e.title.english || e.title.userPreferred}
                id={e.id}

              />
            </div>

          </div>

        ))}
      </div>
    </div>


  </>
  )
}

export default Related
