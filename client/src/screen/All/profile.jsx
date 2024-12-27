import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png"
import bgVM from "../../assets/img-profil/bgVisiMisi.png"
import bunga from "../../assets/img-profil/bungaIcon.svg"
import misiIcon from "../../assets/img-profil/misiIcon.svg"

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


function profile() {

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
        <>
            <Navbar />
            <div className='mx-[25px] mt-[18px]'>
                <div className='flex-col'>
                    <p className='text-[#bdbdbd] text-xs font-normal font-SFPro tracking-tight'>Profil</p>
                    <img src={klinik} className='mt-[30px]' alt="" />
                    <p className='w-[326px] mt-[23.63px] text-xs font-normal font-SFPro leading-tight tracking-tight'>Dr. Nick Aesthetic Clinic merupakan klinik kecantikan yg didirikan pada tahun 2024. Dengan dedikasi penuh terhadap keunggulan dan inovasi, kami membawa teknologi terbaru dan metode perawatan yang terbukti efektif untuk membantu Anda mencapai hasil yang diinginkan.</p>
                </div>
                <div className="w-full h-full flex flex-col mt-[30px]">

                    {/* Visi */}
                    <div className="w-[326px] h-[244px] flex justify-center items-center relative">
                        <img src={bgVM} className="absolute rounded-[10px] z-0" alt="Background VM" />
                        <div className="flex flex-col justify-center items-center z-10">
                            <img src={bunga} className="w-[29.20px] h-[21.60px] bottom-[10px] relative" alt="Bunga" />
                            <div className="w-[326px] flex flex-col justify-center items-center">
                                <h1 className="text-white text-base font-medium text-center font-SFPro leading-tight tracking-tight pb-[15px]">Visi Dr. Nich Beauty Aesthetic</h1>
                                <p className="w-[250px] text-justify text-white text-xs font-normal leading-tight tracking-tight">Visi kami adalah untuk memimpin industri estetika dengan menjadi klinik terdepan yang dikenal karena inovasi, kualitas, dan layanan pelanggan yang luar biasa. Kami berupaya untuk terus berkembang dan beradaptasi dengan kemajuan teknologi untuk memberikan perawatan terbaik bagi setiap pasien.</p>
                            </div>
                        </div>
                    </div>

                    {/* Misi */}
                    <div className="w-[326px] h-[244px] flex justify-center items-center relative">
                        <img src={bgVM} className="absolute rounded-[10px] z-0" alt="Background VM" />
                        <div className="flex flex-col justify-center items-center z-10">
                            <img src={misiIcon} className="w-[55px] h-[55px] relative" alt="Bunga" />
                            <div className="w-[326px] flex flex-col pb-5 justify-center items-center">
                                <h1 className="text-white text-base font-medium text-center font-SFPro leading-tight tracking-tight pb-[15px]">Misi Dr. Nich Beauty Aesthetic</h1>
                                <p className="w-[250px] text-justify text-white text-xs font-normal leading-tight tracking-tight">Misi kami adalah membantu setiap pasien mencapai kepercayaan diri dan kecantikan alami mereka melalui perawatan yang inovatif dan aman. Kami berkomitmen untuk menjadi klinik kecantikan pilihan utama dengan menyediakan layanan yang unggul dan hasil yang nyata.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SERTIFIKASI */}
                <div className="flex flex-col pt-[73px]">
                    <div className="w-[196px] mx-[20px] text-center text-[#464646] text-base font-medium font-['SF Pro Display'] leading-tight tracking-tight">
                        Mengapa memilih Dr. Nich?
                    </div>

                    <div className="flex justify-center items-center pt-[15px]">
                        <div className="w-[325px] h-[283px] bg-white rounded-[10px] border border-[#efefef] flex flex-col justify-center items-center">
                            <Swiper
                                spaceBetween={0}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: false,
                                }}
                                navigation={false}
                                modules={[Autoplay, Pagination, Navigation]}
                                onAutoplayTimeLeft={onAutoplayTimeLeft}
                                className="mySwiper">
                                <SwiperSlide>
                                    <img src={sertifikat1} alt="Sertifikat 1" />
                                </SwiperSlide>
                            </Swiper>
                            <div className="autoplay-progress" slot="container-end">
                                <svg viewBox="0 0 48 48" ref={progressCircle}>
                                    <circle cx="24" cy="24" r="20"></circle>
                                </svg>
                                <span ref={progressContent}></span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default profile