/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";

// IMAGES & ICONS
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";
import logo from "../../assets/logodrnich-white.svg";

// ABOUT IMAGES
import bgAbout from "../../assets/img-about/4.png";
import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
import muka2 from "../../assets/img-about/gambar2.png";

// COMPONENTS
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import CardJenisLayanan from "../../components/cardJenisLayanan.jsx";

// SWIPER
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ArrowRight from "../../../../admin/src/assets/icon/ArrowRight";

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
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/layanan/getAllJenisLayanan");
      console.log("API response:", response.data);
      const sortedJenisLayanan = response.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const dataWithTimestamp = {
        data: sortedJenisLayanan,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("jenisLayanan", JSON.stringify(dataWithTimestamp));

      setJenisLayanan(sortedJenisLayanan);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch jenis layanan. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("jenisLayanan");

    if (!cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      if (currentTime - parsedData.timestamp < 3600000) {
        console.log("Using cached data...");
        setJenisLayanan(parsedData.data);
      } else {
        console.log("Cache expired. Fetching new data...");
        fetchData();
      }
    } else {
      console.log("Fetching data...");
      fetchData();
    }
  }, []);

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
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}>
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
            <div className="relative w-full h-[409px] mx-auto overflow-y-auto">
              <img
                src={bgAbout}
                className="absolute w-full h-full z-0"
                alt="Background"
              />
              <img
                src={acneFace}
                className="absolute right-0 z-10"
                alt="Face"
              />
              <div className="relative mx-[21px] mt-[25px]">
                <img src={logo} alt="Logo" />
              </div>
              <div className="relative mx-[20px] mt-[20.41px] z-20">
                <h2 className="w-[257px] text-white text-xl font-semibold leading-[25px] tracking-tight">
                  Kurang Percaya diri dengan masalah kulit wajah
                </h2>
              </div>
              <div className="relative mx-[20px] mt-[16px] z-20">
                <p className="w-[250px] text-white text-sm font-normal leading-normal tracking-tight">
                  Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh
                  dari spesialis kami!
                </p>
              </div>
              <div className="relative mx-[20px] mt-[15px] z-20">
                <p className="w-[232px] italic text-white text-xs font-semibold leading-[15px] tracking-wide">
                  Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya.
                </p>
              </div>
              <div className="relative w-[147px] h-10 px-5 py-2.5 bg-white rounded-[10px] border border-white justify-center items-center gap-2.5 inline-flex mx-[20px] mt-[22px] z-20">
                <button className="text-[#c2a353] text-xs font-normal leading-tight tracking-tight">
                  Konsultasi Sekarang
                </button>
              </div>
            </div>
          </div>
          {/* slide kedua */}
          <div className="swiper-slide">Slide 2</div>
        </div>
        <div className="swiper-pagination mx-auto mt-4 flex justify-center"></div>
      </div>

      {/* Why Dr.Nich Section */}
      <section className="flex flex-col my-8 w-full items-center">
        <main className="w-[90%]">
          <h1>Mengapa memilih Dr.Nich ?</h1>
        </main>
      </section>

      {/* Jenis Layanan Section */}
      <section className="flex flex-col my-8 w-full items-center">
        <main className="w-[90%] flex flex-col items-center">
          <div className="flex w-full justify-between items-center">
            <h1 className="font-SFPro font-medium text-base">Layanan</h1>
            <button className="font-SFPro text-xs text-secondary font-medium">
              Lihat semua
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid w-fit grid-cols-2 gap-4 items-center justify-center xl:grid-cols-5 sm:grid-cols-2 mt-4">
              {jenisLayanan && jenisLayanan.length > 0 ? (
                jenisLayanan.slice(0, 12).map((item) => (
                  <div key={item._id}>
                    <CardJenisLayanan item={item} />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-2">No data available</p>
              )}
              {loading && <p className="text-center col-span-2">Loading...</p>}
            </div>
          )}
        </main>
      </section>

      <Footer />
    </div>
  );
}
