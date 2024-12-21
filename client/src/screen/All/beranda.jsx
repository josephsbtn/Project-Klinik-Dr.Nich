import React from 'react'
import { Carousel } from "@material-tailwind/react";

// IMAGE n Icon
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";

// Navbar n Footer
import Navbar from '../auth/navbar';
import Footer from '../auth/footer';

// Navigation Component
function CarouselNavigation({ setActiveIndex, activeIndex, length }) {
  return (
    <div className="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? "w-[19px] h-2.5 bg-[#c2a353]" : "w-2.5 h-2.5 bg-[#dcdcdc]"
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
}

export default function beranda() {
  return (
    <div>
      <Navbar />
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
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40 '></div>
          </div>
        ))}
      </Carousel>

      {/* tombol WhatsApp */}
      <div>
        <img src={waBtn} className='fixed z-50 right-0 px-[18px] bottom-[21.71px]' alt="" />
      </div>

      {/* about */}


      <Footer />
    </div>
  );
}