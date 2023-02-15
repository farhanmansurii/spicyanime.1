import Link from 'next/link';
import React, { useRef } from 'react';
import AnimeCard from './AnimeCard';
const Row = ({ typeOfAnime, text }) => {
  const containerRef = useRef();
  const scrollLeft = () => {
    containerRef.current.style.scrollBehavior = 'smooth';
    containerRef.current.scrollLeft -= 1000;
  }
  const scrollRight = () => {
    containerRef.current.style.scrollBehavior = 'smooth';
    containerRef.current.scrollLeft += 1000;
  }
  return (<div className='w-11/12 mx-auto mt-10   '>
    {typeOfAnime ? (<div className="text-xl lg:text-3xl mx-2 uppercase  justify-between  my-3 flex text-primary font-damion "><div>
      {text}
    </div>

      <div className='space-x-5 hidden lg:flex '>

        <button className='bg-secondary rounded-full scale-150 h-fit hover:scale-125 duration-100' onClick={scrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
          </svg>


        </button>

        <button onClick={scrollRight} className='bg-secondary h-fit rounded-full   scale-150 hover:scale-125 duration-100'>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
          </svg>


        </button>
      </div>
    </div>) : ('')}



    <div ref={containerRef} className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-1 ">
      {typeOfAnime?.map((e) =>
        <Link href={`/details?id=${e.id}`} key={e.id} >

          <AnimeCard key={e.id} animeImg={e.image || e.coverImage.large} title={e.title.english || e.title.userPreferred} extratext={e.rating} id={e.id} />
        </Link>
      )}
    </div>
  </div>
  )
}


export default Row
