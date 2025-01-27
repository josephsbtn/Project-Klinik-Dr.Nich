import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { useSwipeable } from "react-swipeable";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import img1 from "../assets/img-carousel/img1.png"; // Replace with the actual image import


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// Carousel Navigation Component
function CarouselNavigation({ setActiveIndex, activeIndex, length }) {
    return (
      <div className="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
        {new Array(length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i
              ? "w-[19px] h-2.5 bg-[#c2a353]"
              : "w-2.5 h-2.5 bg-[#dcdcdc]"
              }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    );
  }

function CardUlasan() {
  return (
    <>
      {/* Carousel Title */}
      <main className="w-full flex lg:px-0 px-6 justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Customer Punya Cerita
        </h1>
      </main>

      {/* Carousel Component */}
      <Carousel
        className="pb-10 pt-20"
        autoplay={true}
        autoplayDelay={3000}
        loop={true}
        navigation={CarouselNavigation}
      >
        {/* Carousel Slide */}
        <div className="flex flex-col w-[265px] h-[188px] gap-5 px-5 py-7 bg-white rounded-[10px] shadow-[0px_4px_4px_-1px_rgba(12,12,13,0.05)] border border-[#efefef]">
          {/* Header: Image and Name */}
          <div className="flex items-center gap-2">
            <div>
              <img src={img1} alt="Customer" className="w-10 h-10 rounded-full" />
            </div>
            <div>
              <p className="text-[#464646] text-sm font-medium font-SFPro">Nama Customer</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★★★★★</span> {/* Example for stars */}
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="w-[230px]">
            <p className="text-[#464646] text-xs font-normal font-SFPro leading-tight tracking-tight">
              Perawatan di Dr. Nich Aesthetic Beauty benar-benar mengubah kulit saya! Kulit saya
              sekarang lebih cerah dan halus. Terima kasih untuk pelayanan yang luar biasa!
            </p>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </>
  );
}

export default CardUlasan;
