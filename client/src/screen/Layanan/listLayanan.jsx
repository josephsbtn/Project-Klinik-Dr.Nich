import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardJenisLayanan from "../../components/cardJenisLayanan";

function ListLayanan() {
  const [layanan, setLayanan] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLayanan = async () => {
    try {
      const res = (await axios.get("/api/layanan/getAllJenisLayanan")).data;
      setLayanan(res);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchLayanan();
  });

  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col items-center space-y-4">
        <Navbar selected={"Layanan"} />
        <div className="flex items-center w-[80%]  justify-start space-x-2 mt-4 ">
          <a
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs text-disable-text font-normal">
            Beranda
          </a>
          <ArrowRightDisable />
          <a className="cursor-pointer text-xs text-disable-text font-normal">
            Layanan
          </a>
        </div>
        <main className="w-[80%] flex flex-col items-center space-y-4">
          <h1 className="font-SFPro w-full text-start text-secondary font-medium text-base">
            Layanan
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-fit justify-center mt-4">
            {layanan && layanan.length > 0 ? (
              layanan.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/layanan/${item._id}`)}>
                  <CardJenisLayanan item={item} />
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </main>
      </section>
    </>
  );
}

export default ListLayanan;
