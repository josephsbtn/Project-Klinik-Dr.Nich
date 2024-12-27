import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import axios from "axios";
import LayananPopuler from "../../components/layananPopuler.jsx";

function DetailTreatment() {
  const navigate = useNavigate();
  const { idJenis, idTreatment } = useParams();
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [durasi, setDurasi] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = (
        await axios.get(`/api/layanan/getLayananById/${idTreatment}`)
      ).data;
      setJudul(res.nama);
      setDeskripsi(res.deskripsi);
      setImage(res.image);
      setDurasi(res.durasi);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something Wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [idTreatment]);
  return (
    <section className="flex flex-col items-center space-y-4">
      <div className="fixed w-full">
        <Navbar selected={"Layanan"} />
      </div>
      <div className="flex items-center w-[90%] justify-start space-x-2 mt-4 pt-20">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/layanan")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Layanan
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate(`/layanan/detail/${idJenis}`)}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Treatment
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate(`/layanan/detail/${idJenis}/${idTreatment}`)}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Detail
        </a>
      </div>
      {loading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : error ? (
        <>
          <h1>{error}</h1>
        </>
      ) : (
        <main className="w-[90%] lg:[80%] flex flex-col space-y-3 items-center">
          <h1 className="text-secondary lg:text-2xl  font-SFPro font-medium text-base w-full text-start leading-5 tracking-wide">
            {judul}
          </h1>
          <div className="w-full flex flex-col space-y-4 lg:flex-row lg:justify-start lg:space-x-8">
            <img
              src={image}
              className="w-full h-auto lg:w-96 lg:h-96 object-cover rounded-lg"
              alt={judul}
            />
            <div className="w-full space-y-4 lg:max-w-[60%]">
              <p className="whitespace-pre-line text-xs lg:text-base font-SFPro font-normal text-text leading-4 lg:leading-5 tracking-normal lg:-tracking-tight">
                {deskripsi}
              </p>
              <p className="w-full text-start text-xs lg:text-base  font-SFPro font-normal text-text leading-4 lg:leading-5  tracking-normal lg:-tracking-tight">
                Durasi Treatment: {durasi}
              </p>
              <button
                className="w-full py-3 lg:w-[15%] lg:mt-8  rounded-xl bg-secondary text-white text-sm font-SFPro font-medium"
                onClick={() =>
                  (window.location.href = "https://wa.link/2ec5l5")
                }>
                Reservasi
              </button>
            </div>
          </div>

          <div className="w-full">
            <LayananPopuler />
          </div>
        </main>
      )}
      <div></div>

      <Footer />
    </section>
  );
}

export default DetailTreatment;
