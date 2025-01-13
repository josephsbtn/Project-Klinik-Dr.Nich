import React from 'react'

//navbar
import Navbar from "../auth/navbar";
// footer
import Footer from "../auth/footer";

// layaran dan produk terbaru
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";

// IMAGE AND ICON
import arrow from "../../assets/arrow-right.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import banner1 from "../../assets/img-produk/banner.png";
import banner2 from "../../assets/img-produk/banner2.png";
import banner3 from "../../assets/img-produk/banner3.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Produk() {
    return (
        <>
            <Navbar selected={"Produk"} />
            <div className="flex items-center w-[90%] justify-start space-x-2 mt-[18px] lg:mx-[120px]">
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

            <div className="flex items-center w-[90%] justify-start space-x-2 mt-[18px] lg:mx-[120px]">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="w-full h-auto rounded-lg"
                >
                    <SwiperSlide>
                        <div className="flex items-center justify-center bg-blue-500 text-white text-lg font-semibold w-full">
                            <img className="w-full h-[528.36px] rounded-[10px] object-cover" src={banner1} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center bg-green-500 text-white text-lg font-semibold w-full">
                            <img className="w-full h-[528.36px] rounded-[10px] object-cover" src={banner2} />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="flex items-center w-[90%] justify-between space-x-2 mt-[18px] gap-20 grid grid-cols-3">
                <div className="w-full h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>

                <div className="w-[300px] h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>

                <div className="w-[300px] h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>

                <div className="w-[300px] h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>

                <div className="w-[300px] h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>

                <div className="w-[300px] h-[280px] justify-center items-center inline-flex">
                    <img className="w-[300px] h-[280px] rounded-[10px]" src="https://via.placeholder.com/300x280" />
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Produk