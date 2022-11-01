import { motion } from 'framer-motion';
import React from 'react';
import AnimeCard from './AnimeCard';
const Row = ({ typeOfAnime, text }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2
      }
    }
  };
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return (<div className='w-10/12 mx-auto my-3rem  '>
    {typeOfAnime ? (<div className="text-xl lg:text-3xl mx-3  my-3 text-primary font-damion "> {text}</div>) : ('')}
    <motion.ul
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >


      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
        {typeOfAnime.map((e) =>
          <motion.li key={e.id} className="item" variants={item} >

            <AnimeCard animeImg={e.image} title={e.title.english || e.title.userPreferred} extratext={e.rating} id={e.id} />
          </motion.li>
        )}
      </div>
    </motion.ul>
  </div>
  )
}


export default Row
