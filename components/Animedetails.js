import React from 'react'

const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.cover})` }}
      className="bg-cover bg-center w-vw lg:w-10/12 lg:mx-auto"
    >
      <div className="bg-black/50 w-100">
        <div className="flex flex-col md:flex-row items-center  ">
          <div className=" p-2 my-3 mx-6">

            <div className=" w-[233.33px] bg-cover bg-no-repeat h-[350px] shadow-2xl rounded-lg " style={{ backgroundImage: `url(${deets.image})` }}>
            </div>
          </div>
          <div className="flex flex-col p-2 ">
            <div className="flex sm:flex-auto sm:mt-10 ">
              <div className="text-shadow-xl text-white text-4xl font-semibold">
                {deets.title.english || deets.title.userPreffered || deets.title.native}
              </div>
              <div className="px-2 py-1bg-transparent backdrop-blur text-white font-bold rounded-sm w-fit h-fit align-bottom mt-2 mx-4">

                {deets.type}
              </div>
            </div>

            <div className="flex flex-wrap my-2">
              <div className="px-2 py-1 my-1 bg-transparent backdrop-blur font-bold text-white mx-1  border-2 border-white  rounded-sm">
                Category :
              </div>
              {deets.genres.map((e, index) => (
                <div
                  key={index}
                  className="px-2 py-1 m-1 bg-transparent backdrop-blur  border border-white   font-semibold text-white rounded-sm"
                >
                  {e}
                </div>
              ))}
            </div>
            <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-white border-2 border-white rounded-sm w-fit">
              Status : {deets.status}
            </div>
            {deets.type === "TV" && (
              <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-white  border-2 border-white rounded-sm w-fit">
                Total Episodes : {deets.totalEpisodes} Episodes
              </div>
            )}

            <div className="px-2 py-1 m-1 bg-transparent backdrop-blur font-semibold text-white rounded-sm  border-2 border-white w-fit">
              Duration : {deets.duration} minutes
            </div>
            <div className="text-shadow-md line-clamp-5 text-white text-sm  mt-2">
              {deets.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Animedetails
