import React, { useRef } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png";
import bgVM from "../../assets/img-profil/bgVisiMisi.png";
import bunga from "../../assets/img-profil/bungaIcon.svg";
import misiIcon from "../../assets/img-profil/misiIcon.svg";

// IMAGE & ICONS SERTIFIKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Profile() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

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

  return (
    <>
      <Navbar selected={"Profile"} />
      <div className="mx-[25px] mt-[18px] lg:mx-[120px]">
        <div className="flex-col lg:items-center lg:justify-center">
          <p className="text-[#bdbdbd] text-xs font-normal font-SFPro tracking-tight lg:text-sm">
            Profil
          </p>
          <img
            src={klinik}
            className="mt-[30px] lg:w-[1040px] lg:h-[719px] lg:mx-auto"
            alt="Klinik"
          />
          <p className="w-[326px] mt-[24px] text-xs font-normal font-SFPro leading-tight tracking-tight lg:w-full lg:mx-auto lg:text-base">
            Dr. Nick Aesthetic Clinic merupakan klinik kecantikan yg didirikan
            pada tahun 2024. Dengan dedikasi penuh terhadap keunggulan dan
            inovasi, kami membawa teknologi terbaru dan metode perawatan yang
            terbukti efektif untuk membantu Anda mencapai hasil yang diinginkan.
          </p>
        </div>

        {/* Visi & Misi Section */}
        <div className="w-full flex flex-col mt-[30px] lg:flex-row lg:justify-center lg:gap-8">
          {/* Visi */}
          <div className="relative w-full h-[244px] lg:w-[504px] lg:h-[340px] flex justify-center items-center">
            <img
              src={bgVM}
              className="absolute w-full h-full rounded-[10px] z-0"
              alt="Background VM"
            />
            <div className="flex flex-col justify-center items-center z-10">
              <img
                src={bunga}
                className="w-[30px] h-full -translate-y-3 lg:w-16 lg:h-16"
                alt="Bunga"
              />
              <h1 className="text-white text-base font-medium text-center font-SFPro leading-tight tracking-tight pb-[15px] lg:text-lg">
                Visi Dr. Nich Beauty Aesthetic
              </h1>
              <p className="w-[250px] text-justify text-white text-xs font-normal leading-tight tracking-tight lg:w-[443px]">
                Visi kami adalah untuk memimpin industri estetika dengan menjadi klinik terdepan yang dikenal karena inovasi, kualitas, dan layanan pelanggan yang luar biasa. Kami berupaya untuk terus berkembang dan beradaptasi dengan kemajuan teknologi untuk memberikan perawatan terbaik bagi setiap pasien.
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="relative w-[326px] h-[244px] lg:w-[504px] lg:h-[340px] flex justify-center items-center">
            <img
              src={bgVM}
              className="absolute w-full h-full rounded-[10px] z-0"
              alt="Background VM"
            />
            <div className="flex flex-col justify-center items-center z-10">
              <img
                src={misiIcon}
                className="w-[30px] h-auto -translate-y-3 lg:w-16 lg:h-16"
                alt="Misi Icon"
              />
              <h1 className="text-white text-base font-medium text-center font-SFPro leading-tight tracking-tight pb-[15px] lg:text-lg">
                Misi Dr. Nich Beauty Aesthetic
              </h1>
              <p className="w-[250px] text-justify text-white text-xs font-normal leading-tight tracking-tight lg:w-[443px]">
                Misi kami adalah membantu setiap pasien mencapai kepercayaan diri dan kecantikan alami mereka melalui perawatan yang inovatif dan aman. Kami berkomitmen untuk menjadi klinik kecantikan pilihan utama dengan menyediakan layanan yang unggul dan hasil yang nyata.
              </p>
            </div>
          </div>
        </div>

        {/* Sertifikasi Section */}
        <div className="flex flex-col pt-10">
          {/* Section Title */}
          <div className="w-full mx-auto text-left text-[#464646] text-base font-medium font-SFPro leading-tight tracking-tight">
            Mengapa memilih Dr. Nich?
          </div>

          {/* Carousel Container */}
          <div className="flex flex-col gap-[15px] justify-center items-center pt-4 pb-4 lg:flex-row">
            <div className="w-[325px] bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-center shadow-sm lg:w-[504px]">
              <h1 className="pb-4 text-[#c2a353] text-sm font-medium font-SFPro leading-tight tracking-tight">Berpengalaman dan Bersertifikat</h1>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-auto rounded-lg"
              >
                <SwiperSlide>
                  <div className="flex items-center justify-center bg-blue-500 text-white text-lg font-semibold w-full aspect-[16/9] lg:aspect-[4/3]">
                    Slide 1: Sertifikasi A
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex items-center justify-center bg-blue-500 text-white text-lg font-semibold w-full aspect-[16/9] lg:aspect-[4/3]">
                    Slide 2: Sertifikasi B
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Teknologi */}
            <div className="w-[325px] bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-center shadow-sm lg:w-[504px]">
              <h1 className="pb-4 text-[#c2a353] text-sm font-medium font-SFPro leading-tight tracking-tight text-center">
                Teknologi Terkini & Produk Berkualitas
              </h1>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-auto rounded-lg"
              >
                <SwiperSlide>
                  <div className="flex items-center justify-center bg-blue-500 text-white text-lg font-semibold w-full aspect-[16/9] lg:aspect-[4/3]">
                    Slide 1: Sertifikasi A
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex items-center justify-center bg-green-500 text-white text-lg font-semibold w-full aspect-[16/9] lg:aspect-[4/3]">
                    Slide 2: Sertifikasi B
                  </div>
                </SwiperSlide>
              </Swiper>
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
    </>
  );
}

export default Profile;
