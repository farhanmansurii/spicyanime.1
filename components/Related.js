import React from 'react'
import AnimeCard from './AnimeCard'
const Related = ({ relations, text }) => {
  return (<>

    <div className='w-11/12 mx-auto my-6 '>
      <div className="text-xl lg:text-3xl mx-2  my-3 text-primary font-damion ">
        {text}
      </div>
      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
        {relations.map((e) => (

          e.type === "TV" &&
          <div key={e.id} >

            < AnimeCard
              key={e.id}
              animeImg={e.image}
              title={e.title.userPreferred || e.title.english}
              id={e.id}
            />
          </div>
        ))}
        {relations.map((e) => (

          e.type === "MOVIE" &&
          <div key={e.id} >
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
