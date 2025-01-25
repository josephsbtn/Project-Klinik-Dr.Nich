import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// ASSETS
import Navbar from "../auth/navbar";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import Footer from "../auth/footer";
import LoadingSpinner from "../../components/LoadingSpinner";

function DetailPromo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [syarat, setSyarat] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getPromoById/${id}`
      );
      const resPromo = response.data;
      setNama(resPromo.nama);
      setDetail(resPromo.detail);
      setImage(resPromo.image);
      setSyarat(resPromo.syarat);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <section className="flex flex-col items-center space-y-4 w-full">
      <div className="fixed w-full z-50">
        <Navbar selected={"Promo"} />
      </div>

      <div className="flex items-center w-[90%] lg:w-4/5 justify-start space-x-2 mt-4 pt-20">
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
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Detail
        </a>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center w-[90%] lg:w-[80%] md:w-[80%] ">
          <>
            <img 
            className="w-full h-[328px] rounded-[5px] object-cover opacity-90"
            src={image || "fafa"} // Fallback if foto is unavailable
            alt={nama || "Thumbnail"}
            />
            <h1 className="w-[325px] text-[#c2a353] text-base font-medium font-SFPro leading-[25px] tracking-tight">{nama}</h1>

            {/* Deskripsi */}
            <div className="flex flex-col items-start w-full pt-6 pb-1">
            <h1 className="text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight">Deskripsi Treatment</h1>
            </div>
            <p className="text-[#464646] text-xs font-normal font-SFPro leading-[17px] tracking-tight">{detail}</p>

            {/* Syarat */}
            <div className="flex flex-col items-start w-full pt-6 pb-1">
            <h1 className="text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight">Syarat dan Ketentuan</h1>
            </div>
            <p className=" text-[#464646] text-xs font-normal font-SFPro leading-[17px] tracking-tight">{syarat}</p>
          </>
      </main>

      <div className="flex flex-col gap-4 z-0 mx-auto lg:mx-[120px] w-[90%] lg:w-[80%] md:w-[80%] items-center">
        {/* Layanan */}
        <section className="lg:w-full w-full">
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

export default DetailPromo;
