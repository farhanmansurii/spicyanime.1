import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import parse from 'html-react-parser';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { db } from './config/firebase';
const Animedetails = ({ deets, user, watchlist, animen, epi }) => {
  const deeid = deets.id
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


          <div className="flex flex-col p-2  flex-0">

            <div className=" flex flex-row sm:mt-10 flex-wrap  gap-4  w-full  ">
              <div className=" text-primary text-5xl ml-4 lg:text-6xl font-damion  ">
                {deets.title.english || deets.title.userPreferred || deets.title.romaji || ''}
              </div>

              <div className='flex  my-auto ml-4 w-fit flex-auto '>


                {user &&

                  <div className='my-auto ml-4'>

                    {!setIsAdded ?
                      (<button className='btn btn-circle p-3   w-fit bg-secondary/50 hover:bg-secondary/50 border-0 duration-10000 ease-linear text-primary' onClick={saveAnime} >
                        < AiOutlineHeart className='h-6  w-6' />
                      </button>) :
                      (<button className=' btn btn-circle p-3 w-fit bg-secondary-focus/50 hover:bg-secondary-focus/50 border-0  duration-600 ease-linear text-primary' onClick={removeAnime} > < AiFillHeart className=' h-6 w-6 ease-in duration-600 ' />
                      </button>)}

                  </div>
                }

              </div>
            </div>



            <div style={{ backgroundColor: deets.coverImage.color || "#cc2936" }} className={`px-3  bg- rounded-2xl py-2 flex  lg:max-h-[10rem] max-h-[5rem] overflow-y-scroll scrollbar-hide flex-row m-1 mt-3 text-xs lg:text-lg    text-base-100 text-shadow-xl   border-secondary/30 w-11/12 `}>
              <div  >
                <div   >
                  {parse(`
                    Synopsis : ${deets.description}
                 `
                  )}
                </div>

              </div>

            </div>
            <div className="flex gap-2 flex-wrap my-2">

              <div style={{ backgroundColor: deets.coverImage.color || "#cc2936", }} className="px-2 py-1   flex  text-sm lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                Rating :  {deets.score.decimalScore}
              </div>
              <div style={{ backgroundColor: deets.coverImage.color || "#cc2936", }} className="px-2 py-1   flex  text-sm lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                Type :  {deets.format}
              </div>
              <div style={{ backgroundColor: deets.coverImage.color || "#cc2936", }} className="px-2 py-1  capitalize flex  text-sm lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                Status :  <span className='lowercase'>&nbsp;{deets.status}</span>
              </div>
              {
                deets.totalEpisodes !== null ? (
                  <div style={{ backgroundColor: deets.coverImage.color || "#cc2936", }} className="px-2 py-1  flex  text-sm lg:text-lg  rounded-2xl text-base-100   text-shadow-xl  border-secondary/30 w-fit">
                    No of Episodes : {epi.length || ' '}
                  </div>
                ) : ('')
              }


            </div>
            <div className='flex '>





              {/* {deets.startDate.day !== null && (<div className="px-2 py-1 flex  text-sm lg:text-lg  rounded-2xl text-base-100  border-secondary/30 text-shadow-xl   w-fit">
                from  {deets.startDate.month}/{deets.startDate.year}
              </div>)}
              {deets.endDate.day !== null && (<div className="px-2 py-1 flex  text-sm lg:text-lg  rounded-2xl text-base-100 border-secondary/30 text-shadow-xl   w-fit">
                to  {deets.endDate.month}/{deets.endDate.year}
              </div>)} */}

            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Animedetails
