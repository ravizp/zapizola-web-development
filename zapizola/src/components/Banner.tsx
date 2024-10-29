"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex justify-center">
      {/* Kontainer banner */}
      <div className="main-container max-w-[90vw] px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          speed={500}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}>
          <SwiperSlide>
            <Image
              src="https://cdn.dribbble.com/users/5297140/screenshots/13995477/media/3769cfb75e2e53734862cc0a3bc1c732.gif"
              className="rounded-lg border-2 border-black object-cover w-full h-[600px]"
              alt=""
              width={800}
              height={600}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://cdn.dribbble.com/users/5297140/screenshots/13990493/media/13ed6c75c577462c485d6093cbf25694.gif"
              className="rounded-lg border-2 border-black object-cover w-full h-[600px]"
              alt=""
              width={800}
              height={600}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://cdn.dribbble.com/users/5297140/screenshots/13987812/media/2e26431bc8bf0467864b7af8bfa1894f.gif"
              className="rounded-lg border-2 border-black object-cover w-full h-[600px]"
              alt=""
              width={800}
              height={600}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://cdn.dribbble.com/users/5297140/screenshots/13970810/media/9f2d9adf71a69248fda91c08f68fe63c.gif"
              className="rounded-lg border-2 border-black object-cover w-full h-[600px]"
              alt=""
              width={800}
              height={600}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://cdn.dribbble.com/users/5297140/screenshots/13964097/media/8d69942b331c21c5a7f0d1fc6a43b09a.jpg"
              className="rounded-lg border-2 border-black object-cover w-full h-[600px]"
              alt=""
              width={800}
              height={600}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
