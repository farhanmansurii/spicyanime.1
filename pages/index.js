import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "../components/Banner";
export default function Home({ bannerimg }) {
  console.log(bannerimg);
  return (
    <>
      <Swiper slidesPerView={1} loop={true}>
        {bannerimg.map((e, index) => (
          <SwiperSlide key={index}>
            <Banner
              titles={e.title.english}
              description={e.description}
              imageban={e.cover}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch("https://api.consumet.org/meta/anilist/popular");
  const json = await res.json();
  return { bannerimg: json.results };
};
