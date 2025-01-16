import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//navbar
import Navbar from "../auth/navbar";
// footer
import Footer from "../auth/footer";

// layaran dan produk terbaru
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";

// cardProduct
import CardProduct from "../../components/kategoriProductCard.jsx";

// IMAGE AND ICON
import arrow from "../../assets/arrow-right.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import banner1 from "../../assets/img-produk/banner.png";
import banner2 from "../../assets/img-produk/banner2.png";
import banner3 from "../../assets/img-produk/banner3.png";
import collagen from "../../assets/img-produk/collagen.png";
import flimtyfiber from "../../assets/img-produk/flimtyfiber.png";
import haircare from "../../assets/img-produk/haircare.png";
import makeup from "../../assets/img-produk/makeup.png";
import skincare from "../../assets/img-produk/skincare.png";
import waxingkit from "../../assets/img-produk/waxingkit.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Produk() {
  const navigate = useNavigate();


  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (await axios.get("/api/promo/getAllkategoriProduk")).data;

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
        {content &&
          content.map((item) => (
            <div key={item._id}>
              <CardProduct item={item} />
            </div>
          ))
        }
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

export default Produk;
