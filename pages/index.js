import Link from "next/link";
import React from "react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "../components/Banner";
import { auth } from "../components/config/firebase";
import Row from "../components/Row";
export default function Home({ bannerimg, popular, contwatch, setcontwatch, action, watchlist, recentlyaired, user, handleAuth }) {
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return (
    <><div className="  flex w-11/12 justify-between mb-3 mx-auto">
      {user ? (<>
        <div className="text-3xl lg:text-4xl mb-4 mt-2 text-primary font-damion lowercase "> hi,  {user?.displayName}</div>
        <button className=" my-auto btn btn-ghost  ml-1" onClick={() => auth.signOut()}><BiLogOut className="w-6 h-6 text-primary" /> </button>
      </>
      ) : (<>
        <div className="text-3xl lg:text-4xl my-4 font-damion  text-primary "> Hello, User</div>

        <button className=" my-auto btn btn-ghost  " onClick={() => handleAuth()} ><AiFillGoogleCircle className="w-10 h-10 text-secondary" /></button>
      </>
      )} </div>


      <div className="w-full lg:w-11/12 mx-auto  z-10  ">
        <Swiper slidesPerView={1} loop={true} pagination={{
          type: "progressbar",
        }}
          cssMode={{}}
          modules={[Pagination, Navigation]}>
          {action.map((e, index) => (
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

      {contwatch.length > 0 ? <div className="text-xl lg:text-3xl mt-10  text-primary w-11/12 mx-auto">
        <div className="mx-2 font-damion my-3">
          Continue Watching
        </div>
        <div className=" flex overflow-x-scroll  scrollbar-hide mx-auto my-3rem ">
          {
            contwatch?.map((e) =>
              <Link href={`/details?id=${e.id}`} key={e.id} >
                <div
                  className="flex flex-col-reverse bg-cover ease-in transition duration-100 transform sm:hover:scale-105  z-10 border-secondary hover:border-4   h-[113px] lg:h-[200px] min-w-[200px] lg:w-[300px] m-2 " key={e.id}
                  style={{ backgroundImage: `url(${e.image})` }}

                >
                  <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t   h-full from-base-100 to-transparent w-full bg-cover ">
                    <div className="self-bottom text-sm  line-clamp-2 text-primary/50 mx-2 whitespace-wrap  ">
                      Ep {e.number} : {e.title}
                    </div>
                    <div className="self-bottom text-shadow-2xl text-primary bg-transparent text-sm lg:text-md mx-2 text-shadow-2xl whitespace-pre-wrap line-clamp-3">
                      {e.eptitle}
                    </div>
                  </div>
                </div>
              </Link>
            )
          }
        </div>

      </div> : ''}
      <div className="flex flex-col    pb-10">
        <Row typeOfAnime={popular} text={'All Time Favourites'} />
        <div className="text-xl lg:text-3xl  text-primary w-11/12 mx-auto">
          <div className="mx-2 font-damion  my-2">
            Recently Aired
          </div>
        </div>

        <Row typeOfAnime={action} text={'Trending now'} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res1 = await fetch("https://api.amvstr.ml/api/v2/popular?limit=10");
  const res2 = await fetch("https://api.amvstr.ml/api/v2/trending?limit=10");
  const res3 = await fetch("https://api.amvstr.ml/api/v2/schedule?limit=10")
  const popular = await res1.json();
  const action = await res2.json();
  const recentlyaired = await res3.json();

  return {
    props: {
      popular: popular.results,
      action: action.results,
      recentlyaired: recentlyaired.results
    },
  };
};
