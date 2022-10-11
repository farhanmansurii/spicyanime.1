import React from 'react'

const Animedetails = ({ deets, addlist, setaddlist }) => {
  console.log(deets)

  return (

    <div
      style={{ backgroundImage: `url(${deets.cover})` }}
      className="bg-cover bg-center w-vw -mt-5 lg:mt-0 lg:w-10/12 lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-base-100 to to-black/25 w-100">
        <div className="flex flex-col md:flex-row items-center  ">
          <div className="  my-3 mx-6">

            <div className=" w-[233.33px] bg-cover bg-no-repeat h-[350px] shadow-2xl rounded-lg " style={{ backgroundImage: `url(${deets.image})` }}>
            </div>
          </div>
          <div className="flex flex-col p-2 ">
            <div className="flex sm:flex-auto sm:mt-10  ">
              <div className="text-shadow-xl text-primary text-4xl font-semibold">
                {deets.title.english || deets.title.userPreferred || deets.title.romaji || 'hi'}
              </div>
              <div className="px-2 py-1 bg-transparent backdrop-blur text-primary text-shadow-xl font-bold rounded-sm w-fit h-fit align-bottom mt-2 mx-4">

                {deets.type}
              </div>
            </div>
            <div >
              <div className="px-2 py-1 flex m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary text-shadow-xl rounded-sm w-fit">
                Category {':'}
                {deets.genres.slice(0, 2).map((e, index) => (
                  <div
                    key={index}
                    className='mx-2 '
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary text-shadow-xl rounded-sm w-fit">
              Status : {deets.status}
            </div>
            {deets.startDate.day !== null ? (<div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary text-shadow-xl rounded-sm w-fit">
              Release Date : {deets.startDate.day}/{deets.startDate.month}/{deets.startDate.year}
            </div>) : ('')}
            {deets.endDate.day !== null ? (<div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary text-shadow-xl rounded-sm w-fit">
              End Date : {deets.endDate.day}/{deets.endDate.month}/{deets.endDate.year}
            </div>) : ('')}
            {
              deets.totalEpisodes !== null ? (
                <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl  border-2 border-primary text-shadow-xl rounded-sm w-fit">
                  Total Episodes : {deets.totalEpisodes} Episodes
                </div>
              ) : ('')
            }

            {deets.totalEpisodes !== null ? <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl rounded-sm  border-2 border-primary text-shadow-xl w-fit">
              Duration : {deets.duration} minutes
            </div> : ('')}
            <div className="text-shadow-md line-clamp-4 text-primary/80 w-11/12  mx-auto lg:mx-0 text-shadow-xl text-sm  mt-2">
              {deets.description}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Animedetails
