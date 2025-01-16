/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";
import LayananPopuler from "../../components/layananPopuler.jsx";
import GaleriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png";
import bgVM from "../../assets/img-profil/bgVisiMisi.png";
import bunga from "../../assets/img-profil/bungaIcon.svg";
import misiIcon from "../../assets/img-profil/misiIcon.svg";
import arrow from "../../assets/arrow-right.svg";
//image layanan
import facialglowacne from "../../assets/img-layanan/facialglowacne.png";
import laserhollywood from "../../assets/img-layanan/laserhollywood.png";

//  IMAGE & ICONS SERTIFKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

import { useSwipeable } from "react-swipeable";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation, useParams } from "react-router-dom";
import CardLayanan from "../../components/CardLayanan.jsx";
import ProdukCard from "../../components/ProdukCard.jsx";

function Pencarian() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const [layanan, setlayanan] = useState([]);
  const [produk, setproduk] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // FETCH DATA
  const location = useLocation()
  const queryParam = new URLSearchParams(location.search)
  const query = queryParam.get("query")
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (await axios.get('api/users/search?query='+query)).data;
      console.log(resLayanan)
      const sortlayanan = resLayanan.layanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      const sortproduk = resLayanan.produk.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setlayanan(sortlayanan);
      setproduk(sortproduk);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar selected={"Galeri"} />
      <div className="mt-[18px]">
        <div className="flex-col">
          <div className="flex gap-[6px] mx-[25px] lg:mx-[120px]">
            <a href="/" className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Beranda
            </a>
            <img src={arrow} alt="" />
            <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Hasil Pencarian dari
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col mt-[30px]">
          {/* Layanan */}
          <div className="w-full h-[600px] flex flex-col items-center">
            <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2">
              {layanan &&
                layanan.map((item) => (
                  <div className="h-10 w-10 bg-black" key={item._id}>
                    <CardLayanan item={item} />
                    
                  </div>
                ))} 
            </div>
            {/* Produk */}
            <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2">
              {produk &&
                produk.map((item) => (
                  <div className="h-10 w-10 bg-black" key={item._id}>
                    <ProdukCard item={item} />
                    
                  </div>
                ))} 
            </div>

            {/* Lihat Lainnya */}
            <div className="mt-6 h-full">
              <button className="w-[109px] h-[31px] text-[#c2a353] rounded-[10px] border border-[#c2a353] text-sm font-medium">
                Lihat Lainnya
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 z-0 lg:mx-[120px]">
            {/* Layanan */}
            <section className="lg:w-full w-[full]">
              <LayananPopuler />
            </section>
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>


        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pencarian;
