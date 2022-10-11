import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "../components/Banner";
import Row from "../components/Row";

export default function Home({ bannerimg, popular, action }) {
  return (
    <>
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
      </div><div className="flex flex-col space-y-5 my-10 pb-10">

        <Row typeOfAnime={popular} text={'All Time Favourite Anime'} />
        <Row typeOfAnime={action} text={'Trending Anime'} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.consumet.org/meta/anilist/popular");
  const res1 = await fetch("https://api.consumet.org/meta/anilist/advanced-search?sort=[%22FAVOURITES_DESC%22,%22EPISODES%22]");
  const res2 = await fetch("https://api.consumet.org/meta/anilist/trending");
  const json = await res.json();
  const popular = await res1.json();
  const action = await res2.json();

  return {
    props: {
      bannerimg: json.results,
      popular: popular.results,
      action: action.results
    },
  };
};
