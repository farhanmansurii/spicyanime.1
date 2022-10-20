import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { db } from './config/firebase';
const Animedetails = ({ deets, user, watchlist, setwatchlist }) => {
  const deeid = deets.id
  function animeExists(deeid) {
    return watchlist?.some(function (el) {
      return el.id === deeid;
    });
  }
  const setIsAdded = (animeExists(deeid))
  console.log(setIsAdded)
  const animeRef = doc(db, 'users', `${user?.email}`);
  const saveAnime = async () => {

    if (user?.email) {
      await updateDoc(animeRef, {
        savedAnime: arrayUnion({
          userId: user?.uid,
          title: deets.title.userPreferred || deets.title.romaji || deets.title.english,
          id: deets.id,
          image: deets.image,
        })
      })
    }
  }
  const removeAnime = async () => {

    if (user?.email) {
      await updateDoc(animeRef, {
        savedAnime: arrayRemove({
          userId: user?.uid,
          title: deets.title.userPreferred || deets.title.romaji || deets.title.english,
          id: deets.id,
          image: deets.image,
        })
      })

    }


  };
  return (

    <div
      style={{ backgroundImage: `url(${deets.cover})` }}
      className="bg-cover bg-center w-vw -mt-5 lg:mt-0 lg:w-10/12 lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-base-100 to to-black/25 w-100">
        <div className="flex flex-col md:flex-row items-center  ">
          <div className="  my-3 mx-6">

            <div className="w-[149.33px] lg:w-[280.33px] bg-cover bg-no-repeat h-[233px] lg:h-[400px] shadow-2xl rounded-lg " style={{ backgroundImage: `url(${deets.image})` }}>
            </div>
          </div>
          <div className="flex flex-col p-2 ">
            <div className="flex sm:flex-auto sm:mt-10  ">
              <div className="shadow-xl text-primary text-5xl lg:text-6xl font-damion ">
                {deets.title.userPreferred || deets.title.english || deets.title.romaji || ''}
                {!setIsAdded ?
                  (<button className='  btn btn-ghost w-fit  m-1 text-secondary ' onClick={saveAnime} >
                    < AiOutlineHeart className='h-10  w-10' />
                  </button>) :
                  (<button className='  btn w-fit btn-ghost m-1 text-secondary' onClick={removeAnime} > < AiFillHeart className=' h-10 w-10 ease-in duration-600 ' />
                  </button>)}</div>

            </div>




            <div className="px-3 rounded-2xl py-2 flex  flex-row m-1 text-xs lg:text-lg bg-primary   text-secondary text-shadow-xl  w-11/12 ">
              <div >

                <div className='line-clamp-4'>
                  Synopsis : {deets.description}
                </div>
              </div>

            </div>
            <div className='flex flex-wrap'>
              <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary   text-shadow-xl border-2 border-primary/20  w-fit">
                {deets.type}
              </div>
              <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary  text-shadow-xl border-2 border-primary/20  w-fit">
                {deets.genres.slice(0, 4).map((e, index) => (
                  <div
                    key={index}
                    className='mx-1'
                  >
                    {e}
                  </div>
                ))}


              </div>             <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary   text-shadow-xl border-2 border-primary/20  w-fit">
                {deets.status}
              </div>
              {deets.startDate.day !== null && (<div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary  text-shadow-xl border-2 border-primary/20  w-fit">
                from  {deets.startDate.month}/{deets.startDate.year}
                {" "} till {deets.endDate.month || '?'}/{deets.endDate.year || ''}
              </div>)
              }{
                deets.totalEpisodes !== null ? (
                  <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary  text-shadow-xl border-2 border-primary/20  w-fit">
                    {deets.totalEpisodes} episodes
                  </div>
                ) : ('')
              }

              {deets.totalEpisodes !== null ? <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-primary rounded-2xl text-secondary   text-shadow-xl border-2 border-primary/20  w-fit">
                {deets.duration} minutes
              </div> : ('')}

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Animedetails
