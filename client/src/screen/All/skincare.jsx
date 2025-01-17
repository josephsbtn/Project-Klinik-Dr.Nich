import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//navbar
import Navbar from "../auth/navbar";
// footer
import Footer from "../auth/footer";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// layaran dan produk terbaru
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";

function Skincare() {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllProduct`
        )
      ).data;

      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      console.log(sorted);
      setContent(sorted);
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
      <Navbar selected={"Produk"} />
      <div className="flex items-center w-[90%] justify-start space-x-2 mx-auto mt-[18px] lg:mx-[120px]">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs text-disable-text font-normal">
          Produk
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs text-disable-text font-normal">
          Skincare
        </a>
      </div>

      <div className="flex items-center w-[100%] justify-center space-x-2 mx-auto mt-[18px] lg:mx-[120px] lg:w-[90%] lg:h-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full h-auto rounded-lg">
          <SwiperSlide>
            <div className="flex items-center justify-center text-lg font-semibold w-full">
              <img
                className="w-[90%] h-[158px] lg:w-full lg:h-[528.36px] rounded-[10px] object-cover"
                src={banner1}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center text-lg font-semibold w-full">
              <img
                className="w-[90%] h-[158px] lg:w-full lg:h-[528.36px] rounded-[10px] object-cover"
                src={banner2}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex items-center w-[90%] justify-center mt-10 mx-auto lg:mt-28 lg:mx-auto gap-8 lg:mx-[120px] lg:gap-20 grid grid-cols-2 lg:grid-cols-3">
        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={skincare}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Skin Care
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={waxingkit}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Waxing Kit
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={makeup}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Make Up
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={haircare}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Hair Care
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={collagen}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Collagen
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
          <img
            className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
            src={flimtyfiber}
          />
          <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
            Flimty Fiber
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center w-[90%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
        {/* Layanan */}
        <section className="lg:w-full w-full">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Skincare;
