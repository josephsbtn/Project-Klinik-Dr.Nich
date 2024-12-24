import React, { useEffect, useState } from "react";
import { button, Carousel } from "@material-tailwind/react";

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
import masker from "../../assets/img-about/masker.svg";

// COMPONENTS
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";

// SWIPER
import { useSwipeable } from "react-swipeable";

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
  const [activeIndex, setActiveIndex] = useState(0);

  // Data for About Cards
  const aboutCards = [
    {
      bg: bgAbout,
      img: acneFace,
      logo: logo,
      title: "Kurang percaya diri dengan masalah kulit?",
      description:
        "Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!",
      text: "Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya",
      button: "Konsultasi Sekarang",
    },
    {
      bg: bgAbout2,
      img: muka2,
      logo: logo,
      title: "Our Vision",
      description:
        "Becoming the leading skincare provider for natural and effective products.",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % aboutCards.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + aboutCards.length) % aboutCards.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
      <div className="relative w-full mx-auto" {...handlers}>
        <div className="relative max-w-3xl mx-auto">
          {/* Card Content */}
          <div className="flex justify-center h-[409px]">
            <div className="relative text-center h-[409px] w-full">
              <img
                src={aboutCards[activeIndex].bg}
                alt={`Card ${activeIndex + 1}`}
                className="absolute object-cover z-0 w-full h-full"
              />
              <img
                src={aboutCards[activeIndex].img}
                alt={`Card ${activeIndex + 1}`}
                className="absolute right-0 bottom-0 object-cover z-10"
              />
              {aboutCards[activeIndex].logo && (
                <img
                  src={aboutCards[activeIndex].logo}
                  alt="Logo"
                  className="absolute top-[25px] left-[21px] z-20"
                />
              )}
              <div className="relative z-20 p-4">
                <h3 className="w-[218px] pt-[84px] text-xl text-white text-xl font-semibold text-left leading-[25px] tracking-tight font-semibold mb-2">
                  {aboutCards[activeIndex].title}
                </h3>
                <p className="text-left w-[250px] h-[72px] pt-[16px] text-white text-sm font-normal leading-normal tracking-tight">
                  {aboutCards[activeIndex].description}
                </p>
                {aboutCards[activeIndex].text && (
                  <p className="text-left w-[250px] h-[72px] pt-[16px] text-white text-sm font-normal leading-normal tracking-tight">
                    {aboutCards[activeIndex].text}
                  </p>
                )}
                {aboutCards[activeIndex].button && (
                  <button className="mt-4 bg-white text-[#c2a353] py-2.5 px-5 rounded-[10px]">
                    {aboutCards[activeIndex].button}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {aboutCards.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "w-[19px] h-2.5 bg-[#c2a353]"
                    : "w-2.5 h-2.5 bg-[#dcdcdc]"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
