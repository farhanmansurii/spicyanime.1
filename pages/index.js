import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "../components/Banner";
import { auth } from "../components/config/firebase";
import Row from "../components/Row";
import { updateRecentlyWatched } from "../redux/reducers/recentlyWatchedReducer";
export default function Home({ newEp, popular, action, user, handleAuth }) {

  const dispatch = useDispatch();
  const recentlyWatched = useSelector(state => state.recentlyWatched);
  useEffect(() => {

    const storedState = localStorage.getItem("recentlyWatched");
    if (storedState) {
      dispatch(updateRecentlyWatched(JSON.parse(storedState)));
    }
  }, []);
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
      {
        recentlyWatched.length > 0 &&
        <div className="text-xl lg:text-3xl mt-10  text-primary w-11/12 mx-auto">
          <div className="mx-2 uppercase font-damion my-3">
            Continue Watching
          </div>
          <div className=" flex overflow-x-scroll  scrollbar-hide mx-auto   gap-1 ">

            {
              recentlyWatched.map((e) =>
                <Link href={`/details?id=${e.id}`} key={e.id} >
                  <div
                    className="flex flex-col-reverse bg-cover   z-10  aspect-video min-w-[200px] lg:min-w-[300px]  " key={e.id}
                    style={{ backgroundImage: `url(${e.image})` }}

                  >

                    <div className=" flex flex-col-reverse  p-2 lg:p-4 bg-gradient-to-t  border-secondary hover:border-[2px] duration-100 ease-linear   h-full from-base-100 to-transparent w-full bg-cover ">
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
          </div></div>

      }
      <div className="flex flex-col   pb-24 lg:pb-10">
        <Row typeOfAnime={popular} text={'All Time Favourites'} />
        <Row typeOfAnime={action} text={'Trending now'} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data: popular } = await axios.get('https://api.amvstr.ml/api/v2/popular', {
    params: {
      limit: 10,
    },
  });

  const { data: action } = await axios.get('https://api.amvstr.ml/api/v2/trending', {
    params: {
      limit: 10,
    },
  });

  return {
    props: {
      popular: popular.results,
      action: action.results,
    },

  };
};
