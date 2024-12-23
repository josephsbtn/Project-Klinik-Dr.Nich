import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";

// IMAGES & ICONS
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";
import logo from "../../assets/logodrnich-white.svg";

// ABOUT IMAGES
import bgAbout from "../../assets/img-about/4.png";
import bgAbout2 from "../../assets/img-about/5.png";
import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
import muka2 from "../../assets/img-about/gambar2.png";

// COMPONENTS
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";

// SWIPER
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Carousel Navigation Component
function CarouselNavigation({ setActiveIndex, activeIndex, length }) {
  return (
    <div className="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i
              ? "w-[19px] h-2.5 bg-[#c2a353]"
              : "w-2.5 h-2.5 bg-[#dcdcdc]"
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
}

// MAIN FUNCTION
export default function Beranda() {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the first card." },
    { id: 2, title: "Card 2", description: "This is the second card." },
    { id: 3, title: "Card 3", description: "This is the third card." },
    { id: 4, title: "Card 4", description: "This is the fourth card." },
  ];

  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Component */}
      <Carousel
        className="pb-10"
        autoplay={true}
        autoplayDelay={3000}
        loop={true} // Enable looping
        navigation={CarouselNavigation} // Use the CarouselNavigation component
      >
        {[img1, img2, img1].map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
          </div>
        ))}
      </Carousel>

      {/* WhatsApp Button */}
      <div>
        <img
          src={waBtn}
          className="fixed z-50 right-0 px-[18px] bottom-[21.71px]"
          alt="WhatsApp Button"
        />
      </div>

      {/* ABOUT Section */}
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            {/* slide pertama */}
            <div className="relative w-full h-[409px] mx-auto overflow-y-auto">
              <img src={bgAbout} className="absolute w-full h-full z-0" alt="" />
              <img src={acneFace} className="absolute right-0 z-10" alt="" />

              <div className="relative mx-[21px] mt-[25px]">
                <img src={logo} alt="" />
              </div>
              <div className="relative mx-[20px] mt-[20.41px] z-20">
                <h2 className="w-[257px] text-white text-xl font-semibold leading-[25px] tracking-tight">
                  Kurang Percaya diri dengan masalah kulit wajah
                </h2>
              </div>
              <div className="relative mx-[20px] mt-[16px] z-20">
                <p className="w-[250px] text-white text-sm font-normal leading-normal tracking-tight">Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!</p>
              </div>
              <div className="relative mx-[20px] mt-[15px] z-20">
                <p className="w-[232px] italic text-white text-xs font-semibold leading-[15px] tracking-wide">Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya.</p>
              </div>
              <div className="relative w-[147px] h-10 px-5 py-2.5 bg-white rounded-[10px] border border-white justify-center items-center gap-2.5 inline-flex mx-[20px] mt-[22px] z-20">
                <button className="text-[#c2a353] text-xs font-normal leading-tight tracking-tight">Konsultasi Sekarang</button>
              </div>
            </div>
          </div>

          {/* slide kedua */}
          <div className="swiper-slide">Slide 2</div>
        </div>
        <div className="swiper-pagination mx-auto mt-4 flex justify-center"></div>
      </div>
      <Footer />
    </div>
  );
}
