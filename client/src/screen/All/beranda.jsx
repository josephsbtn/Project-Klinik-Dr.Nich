import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { useSwipeable } from "react-swipeable";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// COMPONENTS
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import AboutCard from "../../components/AboutCard";
import CardJenisLayanan from "../../components/cardJenisLayanan.jsx";

import ArrowRight from "../../../../admin/src/assets/icon/ArrowRight";

// IMAGES & ICONS ABOUT
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";
import logo from "../../assets/logodrnich-white.svg";
import bgAbout from "../../assets/img-about/4.png";
import bgAbout2 from "../../assets/img-about/5.png";
import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
import muka2 from "../../assets/img-about/gambar2.png";
import masker from "../../assets/img-about/masker.svg";
import pori from "../../assets/img-about/pori.svg";
import air from "../../assets/img-about/air.svg";

//  IMAGE & ICONS SERTIFKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

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

export default function Beranda() {
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/layanan/getAllJenisLayanan");
      const sortedJenisLayanan = response.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const dataWithTimestamp = {
        data: sortedJenisLayanan,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("jenisLayanan", JSON.stringify(dataWithTimestamp));

      setJenisLayanan(sortedJenisLayanan);
    } catch (error) {
      setError(
        "Failed to fetch jenis layanan. Please try again later (" +
        error.message +
        ")"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("jenisLayanan");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      if (currentTime - parsedData.timestamp < 3600000) {
        setJenisLayanan(parsedData.data);
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, []);

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
      title: "Mau punya kulit sehat dan terawat?",
      bene1: "Kulit lebih cerah dan merata",
      iconBene1: masker,
      bene2: "Menyamarkan noda hitam",
      iconBene2: pori,
      bene3: "Menutrisi kulit agar lebih sehat",
      iconBene3: air,
      button2: "Konsultasi Sekarang",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % aboutCards.length);
  const prevSlide = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + aboutCards.length) % aboutCards.length
    );

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div>
      <Navbar selected={"Beranda"} />
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
          {/* Active Card */}
          <AboutCard card={aboutCards[activeIndex]} />

          {/* Pagination Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {aboutCards.map((_, index) => (
              <span
                key={index}
                className={` rounded-full transition-all duration-300 cursor-pointer ${activeIndex === index
                  ? "w-[19px] h-2.5 bg-[#c2a353]"
                  : "w-2.5 h-2.5 bg-[#dcdcdc]"
                  }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Sertifikasi Section */}
        <div className="flex flex-col pt-10">
          {/* Section Title */}
          <div className="w-full mx-auto pl-[21px] text-left text-[#464646] text-base font-medium font-SFPro leading-tight tracking-tight">
            Mengapa memilih Dr. Nich?
          </div>

          {/* Carousel Container */}
          <div className="flex flex-col gap-[15px] justify-center items-center pt-4 pb-4">
            <div className="w-[325px] h-auto bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
              <h1 className="pb-4 text-[#464646] text-sm font-medium font-SFPro leading-tight tracking-tight">Berpengalaman dan Bersertifikat</h1>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-full rounded-lg"
              >
                <SwiperSlide>
                  <div className="h-[198px] flex items-center justify-center bg-blue-500 text-white text-lg font-semibold">
                    Slide 1: Sertifikasi A
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[198px] flex items-center justify-center bg-green-500 text-white text-lg font-semibold">
                    Slide 2: Sertifikasi B
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Teknologi */}
            <div className="w-[325px] h-auto bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
              <h1 className="pb-4 text-[#464646] text-sm font-medium font-SFPro leading-tight tracking-tight">Teknologi Terkini & Produk Berkualitas</h1>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-full rounded-lg"
              >
                <SwiperSlide>
                  <div className="h-[198px] flex items-center justify-center bg-blue-500 text-white text-lg font-semibold">
                    Slide 1: Sertifikasi A
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="h-[198px] flex items-center justify-center bg-green-500 text-white text-lg font-semibold">
                    Slide 2: Sertifikasi B
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>


        {/* Jenis Layanan Section */}
        <section className="flex flex-col my-8 w-full items-center">
          <main className="w-[90%] flex flex-col items-center">
            <div className="flex w-full justify-between items-center">
              <h1 className="font-SFPro font-medium text-base">Layanan Populer</h1>
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
                {loading && (
                  <p className="text-center col-span-2">Loading...</p>
                )}
              </div>
            )}
          </main>
        </section>
      </div>
      <Footer />
    </div>
  );
}
