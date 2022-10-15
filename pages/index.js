import Link from "next/link";
import React from "react";
import { FcGoogle } from 'react-icons/fc';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "../components/Banner";
import { auth } from "../components/config/firebase";
import Row from "../components/Row";

export default function Home({ bannerimg, popular, action, recentlyaired, user, isLoggedIn, handleAuth }) {

  return (
    <><div className=" w-10/12 justify-between my-3 mx-auto">
      {!isLoggedIn ? (<button onClick={() => handleAuth()} className='btn btn-secondary w-full my-3' >CLick to login </button>) : (<button onClick={() => auth.signOut()} className='btn btn-secondary w-full my-3'> Logout</button>)}
      {user ? (<>
        <div className="text-3xl lg:text-4xl my-4 font-semibold  text-primary "> Welcome Back ,  {user?.displayName}</div>
        <button className=" my-auto btn btn-ghost btn-circle btn-md"><RiLogoutCircleRFill size='md' onClick={() => auth.signOut()} /> </button>
      </>
      ) : (<>
        <div className="text-3xl lg:text-4xl my-4 font-semibold  text-primary ">
          Hello User
        </div><button className="  my-auto btn btn-ghost btn-md">
          <FcGoogle size='md' onClick={() => handleAuth()} /></button>
      </>
      )} </div>
      <div className="w-10/12 mx-auto  border-4 border-secondary/70 rounded-xl">
        <Swiper slidesPerView={1} loop={true}>
          {bannerimg.map((e, index) => (
            <SwiperSlide key={index}>
              <Banner
                titles={e.title.english}
                description={e.description}
                imageban={e.cover}
                id={e.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col space-y-5  my-10 pb-10">

        <Row typeOfAnime={popular} text={'All Time Favourites'} />
        <div className="text-xl lg:text-3xl  font-semibold  text-primary w-10/12 mx-auto">
          <div className="mx-2">
            Recently Aired
          </div>
        </div>
        <div className=" flex overflow-x-scroll  scrollbar-hide w-10/12 mx-auto my-3rem ">
          {recentlyaired.map((e) => (
            (e.type === "TV" &&
              <Link href={`/details?id=${e.id}`} key={e.malId}>
                <div
                  className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105 rounded-[10px] z-10 border-secondary hover:border-4   h-[113px] lg:h-[200px] w-[200px] lg:w-[300px] m-2 " key={e.id}
                  style={{ backgroundImage: `url(${e.image})` }}

                >
                  <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t   h-full from-base-100 to-transparent w-[200px] lg:w-[300px]  bg-cover ">
                    <div className="self-bottom text-sm  line-clamp-2 text-primary/50 mx-2 whitespace-wrap  ">
                      Ep {e.episodeNumber} : {e.episodeTitle}
                    </div>
                    <div className="self-bottom font-semibold text-primary bg-transparent text-sm lg:text-md mx-2 text-shadow-2xl whitespace-pre-wrap line-clamp-3">
                      {e.title.userPreferred}
                    </div>
                  </div>
                </div>
              </Link>
            )))}</div>
        <Row typeOfAnime={action} text={'Trending now'} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.consumet.org/meta/anilist/popular");
  const res1 = await fetch("https://api.consumet.org/meta/anilist/advanced-search?sort=[%22FAVOURITES_DESC%22,%22EPISODES%22]");
  const res2 = await fetch("https://api.consumet.org/meta/anilist/trending");
  const res3 = await fetch("https://api.consumet.org/meta/anilist/recent-episodes?perPage=30")
  const json = await res.json();
  const popular = await res1.json();
  const action = await res2.json();
  const recentlyaired = await res3.json();

  return {
    props: {
      bannerimg: json.results,
      popular: popular.results,
      action: action.results,
      recentlyaired: recentlyaired.results
    },
  };
};
