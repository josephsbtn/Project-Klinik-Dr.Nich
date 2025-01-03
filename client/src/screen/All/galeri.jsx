import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";

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
      <Navbar selected={"Galeri"} />
      <div className="mt-[18px]">
        <div className="flex-col">
          <div className="flex gap-[6px] mx-[25px]">
            <a className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight">
              Beranda
            </a>
            <img src={arrow} alt="" />
            <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight">
              Galeri
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col mt-[30px]">
          {/* Galeri */}
          <div className="w-full h-[600px] flex flex-col items-center">
            <div className="w-[375px] h-[100px] flex items-center border border-[#efefef]">
              <img
                className="w-20 h-20 rounded-[5px] ml-6 opacity-90"
                src="https://via.placeholder.com/80x80"
                alt="Thumbnail"
              />
              <div className="ml-3 flex flex-col">
                <span className="text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                  Brightening Treatment
                </span>
                <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                  <span>Youtube</span>
                  <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] rounded-full"></div>
                  <span>Dr. Nich Beauty Aesthetic</span>
                </div>
              </div>
            </div>

            <div className="w-[375px] h-[100px] flex items-center border-l border-r border-b border-[#efefef] mt-4">
              <img
                className="w-20 h-20 rounded-[5px] ml-6 opacity-90"
                src="https://via.placeholder.com/80x80"
                alt="Thumbnail"
              />
              <div className="ml-3 flex flex-col">
                <span className="text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                  Brightening Treatment
                </span>
                <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                  <span>Youtube</span>
                  <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] rounded-full"></div>
                  <span>Dr. Nich Beauty Aesthetic</span>
                </div>
              </div>
            </div>

            {/* Lihat Lainnya */}
            <div className="mt-6">
              <button className="w-[109px] h-[31px] text-[#c2a353] text-xs font-normal rounded-[10px] border border-[#c2a353] text-sm font-medium">
                Lihat Lainnya
              </button>
            </div>
          </div>

          {/* Layanan Populer */}
          <section className="flex flex-col my-2 w-full items-center">
            {/* <main className="w-full flex px-6 justify-between">
              <h1 className="text-[#464646] text-base font-medium font-SFPro leading-tight tracking-tight">
                Layanan Populer
              </h1>
              <a
                href=""
                className="text-right text-[#c2a353] text-xs font-medium font-['SF Pro Display'] leading-tight tracking-tight">
                Lihat Semua
              </a>
            </main>
            <div className="flex flex-col pt-[15px]">
              <div className="flex justify-center items-center pt-[15px]">
                <div className="carousel carousel-center rounded-box w-80 space-x-[10px]">
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="w-[90%]">
              <LayananPopuler />
            </div>
          </section>

          {/*Layanan Populer 2 */}

          {/* Produk Baru ! */}
          <section className="flex flex-col my-[26px] w-full items-center">
            <main className="w-full flex px-6 justify-between">
              <h1 className="text-[#464646] text-base font-medium font-SFPro leading-tight tracking-tight">
                Produk Baru!
              </h1>
              <a
                href=""
                className="text-right text-[#c2a353] text-xs font-medium font-['SF Pro Display'] leading-tight tracking-tight">
                Lihat Semua
              </a>
            </main>
            <div className="flex flex-col pt-[15px]">
              <div className="flex justify-center items-center pt-[15px]">
                <div className="carousel carousel-center rounded-box w-80 space-x-[10px]">
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="w-[184px] h-[276px] relative">
                      <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                      <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                        Untuk kulit berminyak dan rentang berjerawat
                      </div>
                      <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                        Rp 110.000
                      </div>
                      <img
                        className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                        src="https://via.placeholder.com/184x174"
                      />
                      <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                        Facial Glow Acne
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default profile;
