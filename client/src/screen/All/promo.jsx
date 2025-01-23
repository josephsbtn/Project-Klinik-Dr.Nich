import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";
import galeriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// promo
import PromoCard from "../../components/promoCard.jsx";

// IMAGE AND ICON
import arrow from "../../assets/arrow-right.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";

function Promo() {
  const navigate = useNavigate();
  const [content, setContent] = useState();
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
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
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
    <section className="w-full flex-col items-center">
      <Navbar selected={"Galeri"} />
      {/* <div className="mt-[18px]">
                <div className="flex-col">
                    <div className="flex gap-[6px] mx-[25px] lg:mx-[120px]">
                        <a className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
                            Beranda
                        </a>
                        <img src={arrow} alt="" />
                        <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
                            Promo
                        </p>
                    </div>
                </div>
            </div> */}

      <div className="flex items-center w-[90%] mx-auto justify-start space-x-2 mt-[18px] lg:mx-[120px]">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Promo
        </a>
      </div>

      {/* Promo */}
      <div className="flex flex-col lg:mx-[120px]">
        {content &&
          content.map((item) => (
            <div key={item._id}>
              <PromoCard item={item} />
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-4 z-0 mx-auto lg:mx-[120px] w-[90%]">
        {/* Layanan */}
        <section className="lg:w-full w-[full]">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default Promo;
