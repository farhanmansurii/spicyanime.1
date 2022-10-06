import React from 'react'
import AnimeCard from './AnimeCard'
const Related = ({ relations, text }) => {
  console.log(relations)
  return (<>

    <div className='w-10/12 mx-auto my-6'>

      <div className=" mx-auto p-5 text-xl text-white font-semibold">
        {text}
      </div>
      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
        {relations.map((e) => (

          e.type === "TV" && < AnimeCard
            key={e.id}
            animeImg={e.image}
            title={e.title.english || e.title.userPreferred}
            id={e.id}
          />

        ))}
        {relations.map((e) => (

          e.type === "MOVIE" && < AnimeCard
            key={e.id}
            animeImg={e.image}
            title={e.title.english || e.title.userPreferred}
            id={e.id}
          />

        ))}
      </div>
    </div>

  </>
  )
}

export default Related
