import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png";
import bgVM from "../../assets/img-profil/bgVisiMisi.png";
import bunga from "../../assets/img-profil/bungaIcon.svg";
import misiIcon from "../../assets/img-profil/misiIcon.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable";

// visi
import visi from "../../assets/img-profil/visiAja.svg";
// misi
import misi from "../../assets/img-profil/misiAja.svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Carousel } from "@material-tailwind/react";

import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Profile() {
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [fotoMesin, setFotoMesin] = useState();
  const [fotoSertif, setFotoSertif] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onAutoplayTimeLeft = (s, time, progress) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    if (progressCircle.current) {
      progressCircle.current.style.strokeDasharray = `${circumference}`;
      progressCircle.current.style.strokeDashoffset = `${offset}`;
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/getAllJenisLayanan`
      );
      const fotoMesin = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllMesin`
        )
      ).data;
      const fotoSertif = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllSertif`
        )
      ).data;
      const sortedJenisLayanan = response.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const dataWithTimestamp = {
        data: sortedJenisLayanan,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("jenisLayanan", JSON.stringify(dataWithTimestamp));

      setFotoMesin(fotoMesin);
      setFotoSertif(fotoSertif);
      console.log("foto mesin : " + fotoMesin);
      console.log("foto sertif :" + fotoSertif);
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
    fetchData();
  }, []);

  return (
    <main className="w-full flex flex-col items-center">
      <div className="fixed w-full z-50 top-0">
        <Navbar selected={"Profile"} />
      </div>
      <div className="flex items-center w-[90%]  lg:w-4/5 justify-start space-x-2 mt-4 pt-20">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal font-SFPro leading-tight tracking-wide">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal font-SFPro leading-tight tracking-wide">
          Promo
        </a>
      </div>
      <div className=" flex flex-col items-center mx-[25px] lg:mx-[120px] w-[90%] lg:w-4/5">
        <div className="flex-col items-center lg:items-center lg:justify-center">
          <img
            src={klinik}
            className="mt-[30px] lg:w-[1040px] lg:h-[719px] lg:mx-auto"
            alt="Klinik"
          />
          <p className=" mt-[24px] text-xs font-normal font-SFPro leading-tight tracking-wide lg:mx-auto lg:text-base">
            Dr. Nick Aesthetic Clinic merupakan klinik kecantikan yg didirikan
            pada tahun 2024. Dengan dedikasi penuh terhadap keunggulan dan
            inovasi, kami membawa teknologi terbaru dan metode perawatan yang
            terbukti efektif untuk membantu Anda mencapai hasil yang diinginkan.
          </p>
        </div>

        {/* Visi & Misi Section */}
        <div className="w-full flex flex-col mt-[30px] lg:flex-row lg:justify-center">
          {/* Visi */}
          <div className="w-full flex flex-col items-center lg:items-start lg:justify-start">
            <img
              src={visi}
              className="w-full h-auto lg:w-full lg:h-auto"
              alt="Visi Icon"
            />
          </div>

          {/* Misi */}
          <div className="w-full flex flex-col items-center lg:items-start lg:justify-start">
            <img
              src={misi}
              className="w-full h-auto lg:w-full lg:h-auto"
              alt="Misi Icon"
            />
          </div>
        </div>

        {/* Sertifikasi Section */}
        <div className="flex flex-col pt-10 w-full mx-auto ">
          {/* Section Title */}
          <div className="w-full mx-auto text-left text-[#464646] lg:text-2xl text-base font-medium font-SFPro leading-tight tracking-wide">
            Mengapa memilih Dr. Nich?
          </div>

          {/* Carousel Container */}
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:justify-between  mt-4 lg:mt-0  gap-[15px] justify-center items-center pt-4 pb-4 ">
            {/* Teknologi */}
            <div className="w-[325px] lg:h-[437px] lg:w-[504px] h-auto bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
              <h1 className="pb-4 text-[#464646] text-sm font-medium font-SFPro leading-tight tracking-wide lg:text-secondary lg:text-xl">
                Teknologi Terkini & Produk Berkualitas
              </h1>
              <Carousel
                className="lg:w-[400px] lg:h-[283px] w-full rounded-lg [&_.carousel-navigation]:hidden overflow-hidden"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                slidesPerView={1}
                spaceBetween={20}
                nextArrow={false}
                prevArrow={false}
                autoplayDelay={2000}
                loop={true}
                navigation={({ nextEl: "hidden", prevEl: "hidden" }, false)} // Use the CarouselNavigation component
              >
                {fotoMesin && fotoMesin.length > 0 ? (
                  fotoMesin.map((item) => (
                    <div key={item._id} className="relative px-2">
                      <img
                        className="h-[198px] lg:h-full w-full object-cover bg-blue-500 text-white text-lg font-semibold"
                        src={item.foto}
                        alt={item.nama}
                      />
                    </div>
                  ))
                ) : loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>loading . . .</h1>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>No data found</h1>
                  </div>
                )}
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col gap-4 z-0">
            {/* Layanan */}
            <section className="lg:w-full w-[90%]">
              <LayananPopuler />
            </section>
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
