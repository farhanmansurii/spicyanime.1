import { motion } from "framer-motion";
import React from 'react';
const EpisodeCard = ({ episode }) => {
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return (<>
    <motion.ul className="item" variants={item} ><div
      className="flex flex-col-reverse bg-cover ease-in transition duration-100 rounded-[10px] z-10 border-secondary hover:border-4   h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 "
      style={{ backgroundImage: `url(${episode.image}) ` }}
    >
      <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t   h-full from-base-100 to-transparent w-full bg-cover ">
        <div className="self-bottom text-sm  line-clamp-1 text-primary/50 mx-2 whitespace-wrap  ">
          {episode.description}
        </div>
        <div className="flex-row">

          <div className="self-bottom text-shadow-2xl text-primary bg-transparent text-sm lg:text-md  text-shadow-2xl whitespace-pre-wrap line-clamp-2">
            Ep {episode.number} : {episode.title}</div>
          {episode.isFiller && <div className="w-fit bg-secondary text-xs  mx-2 rounded-md px-2 font-semibold  py-1/2 text-primary">filler</div>}
        </div>

      </div>
    </div>
    </motion.ul>
  </>

  )
}

export default EpisodeCard
