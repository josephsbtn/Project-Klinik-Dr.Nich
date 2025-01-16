import React, { useEffect, useState } from "react";
import axios from "axios";

// produk1
import produk1 from "../assets/img-about/produk1.png";
import ProdukCard from "./ProdukCard";

function ProdukTerbaru() {
  const [produk, setProduk] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const data = async () => {
    try {
      const response = (await axios.get("/api/produk/getAllproduk")).data;
      if (response.length > 6) {
        setLimit(6);
      } else {
        setLimit(response.length);
      }

      const sorted = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProduk(sorted);
      
      console.log("PRODUCT DATA :", produk);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    data();
  }, []);

  return (
    <section className="flex flex-col my-[26px] w-full items-center">
      <main className="w-full flex justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Produk Baru!
        </h1>
        <h1 className="font-SFPro text-xs text-secondary font-medium lg:text-base">
          Lihat Semua
        </h1>
      </main>
      {loading ? (
        <>
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-secondary font-medium">
              Loading..
            </h1>{" "}
          </div>
        </>
      ) : error ? (
        <>
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-red-800 font-medium">
              {error}
            </h1>{" "}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full lg:w-full pt-[15px]">
          <div className="flex lg:justify-start justify-center items-center pt-[15px]  ">
            <div className="carousel carousel-center w-full lg:w-full space-x-[10px]">
              <div className="carousel-item gap-9">
                {produk ? (
                  produk.slice(0, limit).map((item) => (
                    <div key={item._id}>
                      <ProdukCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Produk Tidak Ditemukan
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProdukTerbaru;
