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
      className="flex flex-col-reverse bg-cover    z-10   aspect-video w-[200px] lg:w-[300px] mx-1 "
      style={{ backgroundImage: `url(${episode.image}) ` }}
    >
      <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t duration-100 border-secondary hover:border-2   h-full from-base-100 to-transparent w-full bg-cover ">
        {episode.isFiller ? (<div className="w-full text-center bg-secondary text-xs     font-semibold  py-1/2 text-primary">filler</div>
        ) : (<div className="self-bottom text-sm  truncate w-10/12 text-primary/50 whitespace-wrap  ">
          {episode.description}
        </div>)
        }
        <div className="flex-row">

          <div className="self-bottom  font-semibold  text-shadow-2xl text-primary bg-transparent text-sm lg:text-md  text-shadow-2xl whitespace-pre-wrap line-clamp-2">
            Ep {episode.number} : {episode.title}</div>

        </div>

      </div>
    </div>
    </motion.ul>
  </>

  )
}

export default EpisodeCard
