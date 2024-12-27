import React from 'react'

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png"
import bgVM from "../../assets/img-profil/bgVisiMisi.png"
import bunga from "../../assets/img-profil/bungaIcon.svg"
import misiIcon from "../../assets/img-profil/misiIcon.svg"

function profile() {
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



            </div>
            <Footer />
        </>
    )
}

export default profile