import React from "react";
import { button, Carousel } from "@material-tailwind/react";

// IMAGE n Icon
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";

// img-about
import bgAbout from "../../assets/img-about/4.png";
import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
import muka2 from "../../assets/img-about/gambar2.png";

// Navbar n Footer
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";

// Navigation Component
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

const about = [
  {
    id: 1,
    title: "About Us",
    Image: bgAbout,
    object: acneFace,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies libero.",
    button: "Read More",
  },
  {
    id: 2,
    title: "About Us",
    Image: bgAbout,
    object: muka2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget ultricies libero.",
    button: "Read More",
  },
]

// MAIN FUNCTION
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
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40 "></div>
          </div>
        ))}
      </Carousel>

      {/* tombol WhatsApp */}
      <div>
        <img
          src={waBtn}
          className="fixed z-50 right-0 px-[18px] bottom-[21.71px]"
          alt=""
        />
      </div>

      {/* ABOUT ----------- ABOUT ----------- ABOUT */}
      <div className="w-[375px] h-[409px] bg-[#f5f5f5] flex justify-center items-center">
        {about.map((item) => (
          <div
          key={about.id}
          alt={about.title}
          className="inset-0 w-full h-full flex justify-center items-center"
          >
            {/*gambar slide  */}
            <img
            src={item.Image}
            alt={item.title}
            className="w-[100%] h-[100%] object-cover"
            />
            {/*gambar objek */}
            <img
            src={item.object}
            alt={item.title}
            className="w-[100%] h-[100%] object-cover"
            />
            
            <a href="">
              <button className="bg-[#c2a353] text-white px-4 py-2 rounded-lg">
                {item.button}
              </button>
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
