import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './config/firebase';
const Animedetails = ({ deets, user, animes }) => {
  const [isAdded, setIsAdded] = useState(true)
  const [watchlist, setwatchlist] = useState([])

  React.useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setwatchlist(doc.data()?.savedAnime);
    })
    return () => {
      const found = animes.some(item => item.id === deets.id);
      setIsAdded(found)
    }
  }, []);
  const animeRef = doc(db, 'users', `${user?.email}`);
  const saveAnime = async () => {
    const data = {
      userId: user?.uid,
      title: deets.title.userPreferred || deets.title.romaji || deets.title.english,
      id: deets.id,
      image: deets.image,
      isAdded: true,
    }
    if (user?.email) {
      setIsAdded(true)
      await updateDoc(animeRef, {
        savedAnime: arrayUnion({
          userId: user?.uid,
          title: deets.title.userPreferred || deets.title.romaji || deets.title.english,
          id: deets.id,
          image: deets.image,
          isAdded: true,

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

            <div className="w-[149.33px] lg:w-[233.33px] bg-cover bg-no-repeat h-[233px] lg:h-[350px] shadow-2xl rounded-lg " style={{ backgroundImage: `url(${deets.image})` }}>
            </div>
          </div>
          <div className="flex flex-col p-2 ">
            <div className="flex sm:flex-auto sm:mt-10  ">
              <div className="text-shadow-xl text-primary text-4xl lg:text-4xl font-semibold">
                {deets.title.userPreferred || deets.title.romaji || deets.title.english || 'hi'}
              </div>
              <div className="px-2 py-1 bg-transparent backdrop-blur text-primary text-shadow-xl font-bold rounded-sm w-fit h-fit align-bottom mt-2 mx-4">

                {deets.type}
              </div>
            </div>



            <button className="btn w-fit bg-secondary m-2" onClick={saveAnime} >{!isAdded ? "Add to watchlist" : "Remove from Watchlist"} {isAdded}</button>
            <div className="px-2 py-1 line-clamp-5 flex-row m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary/70 text-shadow-xl border-2 border-primary/20 rounded-sm w-11/12">
              <div >
                Synopsis
                :
                <em>
                  {deets.description}
                </em>
              </div>

            </div>
            <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">
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
            <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">
              Status : {deets.status}
            </div>
            {deets.startDate.day !== null ? (<div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">

              Release Date : {deets.startDate.day}/{deets.startDate.month}/{deets.startDate.year}
            </div>) : ('')}
            {deets.endDate.day !== null ? (<div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">

              End Date : {deets.endDate.day}/{deets.endDate.month}/{deets.endDate.year}
            </div>) : ('')}
            {
              deets.totalEpisodes !== null ? (
                <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">

                  Total Episodes : {deets.totalEpisodes} Episodes
                </div>
              ) : ('')
            }

            {deets.totalEpisodes !== null ? <div className="px-2 py-1 flex m-1 text-xs lg:text-lg bg-transparent backdrop-blur font-semibold text-primary text-shadow-xl border-2 border-primary/20 rounded-sm w-fit">

              Duration : {deets.duration} minutes
            </div> : ('')}

          </div>
        </div>
      </div>
    </div >
  )
}

export default Animedetails
