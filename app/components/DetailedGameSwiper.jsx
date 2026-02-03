"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function DetailedGameSwiper({screens}) {

  return (
    <section className="mb-24 relative">
    
      <Swiper
        modules={[Pagination, Autoplay, Parallax]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
        parallax
        loop
        className="rounded-2xl"
      >
        {screens.map((screen , i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[550px] overflow-hidden rounded-2xl border border-blue-900/40 group">
              {/* Background Image */}
              <Image
                src={screen}
                alt={`Game Screen ${i + 1}`}
                width={300}
                height={200}
                data-swiper-parallax="-150"
                className="h-full w-full object-cover"
              />

              {/* Glow Overlay */}
              {/* <div className="absolute -z-10 inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent" /> */}

             

              {/*  animated glow */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Style */}
      <style jsx global>{`
        .swiper-pagination {
          margin-top: 14px;
          position: relative;
        }
        .swiper-pagination-bullet {
          background: #1e3a8a;
          opacity: 0.4;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #38bdf8;
          opacity: 1;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
