import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import parse from 'html-react-parser';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { db } from './config/firebase';
const Animedetails = ({ deets, user, watchlist, animen, epi }) => {
  const deeid = deets.id
  console.log(deets.coverImage.color)
  function animeExists(deeid) {
    return watchlist?.some(function (el) {
      return el.id === deeid;
    });
  }

  const setIsAdded = (animeExists(deeid))
  const animeRef = doc(db, 'users', `${user?.email}`);
  const saveAnime = async () => {

    if (user?.email) {
      await updateDoc(animeRef, {
        savedAnime: arrayUnion({
          userId: user?.uid,
          title: deets.title.english || deets.title.userPreferred || deets.title.romaji,
          id: deets.id,
          image: deets.coverImage.large,
        })
      })
    }
  }
  const removeAnime = async () => {

    if (user?.email) {
      await updateDoc(animeRef, {
        savedAnime: arrayRemove({
          userId: user?.uid,
          title: deets.title.english || deets.title.userPreferred || deets.title.romaji,
          id: deets.id,
          image: deets.coverImage.large,
        })
      })
    }


  };
  return (

    <div
      style={{ backgroundImage: `url(${deets.coverImage.large})` }}
      className="bg-cover bg-center -mt-8 w-vw  bg-hidden lg:block lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-base-100  to-base-100/20 lg:to-base-100/20  lg:backdrop-blur-lg w-100">
        <div className="flex flex-col md:flex-row  items-center w-11/12  mx-auto gap-4 ">
          <div className="  my-5  mt-48 lg:mt-4 lg:w-9/12 " >

            <div className="w-[149.33px] lg:w-[280.33px] bg-cover  hidden  md:block bg-no-repeat h-[233px] lg:h-[400px] shadow-2xl rounded-lg " style={{ backgroundImage: `url(${deets.coverImage.large})` }}>
            </div>
          </div>


          <div className="flex flex-col p-2 ">

            <div className=" flex flex-row sm:mt-10 flex-wrap   w-full  ">
              <div className=" text-primary text-5xl ml-4 lg:text-6xl font-damion  ">
                {deets.title.english || deets.title.userPreferred || deets.title.romaji || ''}
              </div>
              <div className='flex  my-auto ml-4 w-fit flex-auto '>


                <button style={{ backgroundColor: deets.coverImage.color }} className='btn btn-circle p-3 lowercase  w-fit /50 hover:/50 border-0 duration-10000 ease-linear text-primary ' >sub</button>
                {user &&

                  <div className='my-auto ml-4'>

                    {!setIsAdded ?
                      (<button className='btn btn-circle p-3   w-fit /50 hover:/50 border-0 duration-10000 ease-linear text-primary' onClick={saveAnime} >
                        < AiOutlineHeart className='h-6  w-6' />
                      </button>) :
                      (<button style={{ backgroundColor: deets.coverImage.color }} className=' btn btn-circle p-3 w-fit  border-0  duration-600 ease-linear text-primary' onClick={removeAnime} > < AiFillHeart className=' h-6 w-6 ease-in duration-600 ' />
                      </button>)}

                  </div>
                }
              </div>
            </div>



            <div style={{ backgroundColor: deets.coverImage.color, }} className={`px-3  bg- rounded-2xl py-2 flex  lg:max-h-[10rem] max-h-[5rem] overflow-y-scroll scrollbar-hide flex-row m-1 mt-3 text-xs lg:text-lg    text-base-100 text-shadow-xl   border-secondary/30 w-11/12 `}>
              <div  >
                <div   >
                  {parse(`
                    Synopsis : ${deets.description}
                 `
                  )}
                </div>

              </div>

            </div>
            <div className='flex flex-wrap'>


              <div style={{ backgroundColor: deets.coverImage.color, }} className="px-2 py-1 flex m-1 text-[9px] lg:text-lg    text-base-100 rounded-2xl border-secondary/30  text-shadow-xl   w-fit">
                {deets.genres.map((e, index) => (
                  <div
                    key={index}
                    className='mx-1'
                  >
                    {e}
                  </div>
                ))}


              </div>
              <div style={{ backgroundColor: deets.coverImage.color, }} className="px-2 py-1  lowercase flex m-1 text-[9px] lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                {deets.status}
              </div>
              <div style={{ backgroundColor: deets.coverImage.color, }} className="px-2 py-1  lowercase flex m-1 text-[9px] lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                {deets.year}
              </div>
              {/* {deets.startDate.day !== null && (<div className="px-2 py-1 flex m-1 text-[9px] lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                from  {deets.startDate.month}/{deets.startDate.year}
              </div>)}
              {deets.endDate.day !== null && (<div className="px-2 py-1 flex m-1 text-[9px] lg:text-lg  rounded-2xl text-base-100 border-secondary/30 text-shadow-xl   w-fit">
                to  {deets.endDate.month}/{deets.endDate.year}
              </div>)} */}
              {
                deets.totalEpisodes !== null ? (
                  <div style={{ backgroundColor: deets.coverImage.color, }} className="px-2 py-1  flex m-1 text-[9px] lg:text-lg  rounded-2xl text-base-100   text-shadow-xl  border-secondary/30 w-fit">
                    {epi.length || ' '} episodes
                  </div>
                ) : ('')
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Animedetails
