import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SecondCardLayanan from "../../components/SecondCardLayanan";
import LayananPopuler from "../../components/layananPopuler";
function DetailJenisLayanan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listLayanan, setListLayanan] = useState();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resJenis = (
        await axios.get(`/api/layanan/getJenisLayananById/${id}`)
      ).data;
      const resList = (
        await axios.get(`/api/layanan/getLayananByJenisLayanan/${id}`)
      ).data;
      setListLayanan(resList);
      setJudul(resJenis.nama);
      setDeskripsi(resJenis.deskripsi);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="w-full flex flex-col items-center ">
        <div className="fixed w-full">
          <Navbar selected={"Layanan"} />
        </div>
        <div className="flex items-center w-[90%]  justify-start space-x-2 mt-4 pt-20 ">
          <a
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs text-disable-text font-normal">
            Beranda
          </a>
          <ArrowRightDisable />
          <a
            onClick={() => navigate("/layanan")}
            className="cursor-pointer text-xs text-disable-text font-normal">
            Layanan
          </a>
          <ArrowRightDisable />
          <a
            onClick={() => navigate("/layanan")}
            className="cursor-pointer text-xs text-disable-text font-normal">
            Treatment
          </a>
        </div>
        {loading ? (
          <>
            <h1>Loading..</h1>
          </>
        ) : error ? (
          <>
            <h1>{error}</h1>
          </>
        ) : (
          <main className="w-[90%] flex flex-col mt-6 space-y-3">
            <h1 className="text-base font-medium font-SFPro text-secondary leading-5">
              {judul}
            </h1>
            <p className="max-w-full text-start font-SFPro text-text text-xs">
              {deskripsi}
            </p>

            <h1 className="font-SFPro font-medium pt-4 text-text text-sm">
              Daftar Treatment
            </h1>

            <div className="flex flex-col items-center space-y-3 w-full">
              {listLayanan?.map((item) => (
                <div key={item._id} className="">
                  <SecondCardLayanan item={item} />
                </div>
              ))}
            </div>
            <LayananPopuler />
          </main>
        )}
        <Footer />
      </section>
    </>
  );
}

export default DetailJenisLayanan;
