import React, { useEffect, useState } from "react";
import CardLayanan from "./CardLayanan";
import axios from "axios";

function LayananPopuler() {
  const [layanan, setLayanan] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);

  const fetchData = async () => {
    try {
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/getAllLayanan`
        )
      ).data;
      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      ); // Sort by reserved count
      setLayanan(sorted);
      if (layanan.length > 6) {
        setLimit(6);
      } else {
        setLimit(layanan.length);
      }

      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <section className="flex flex-col my-[26px] w-full items-center">
      <main className="w-full flex justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Layanan Populer
        </h1>
        <h1 className="font-SFPro text-xs text-secondary font-medium lg:text-base">
          Lihat Semua
        </h1>
      </main>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="font-SFPro text-base text-secondary font-medium">
            Loading..
          </h1>
        </div>
      ) : error ? (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="font-SFPro text-base text-red-800 font-medium">
            {error}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col w-full lg:w-full pt-[15px]">
          <div className="flex lg:justify-start justify-center items-center pt-[15px]">
            <div className="carousel carousel-center w-full lg:w-full space-x-[10px]">
              <div className="carousel-item gap-9">
                {layanan.length > 0 ? (
                  layanan.slice(0, limit).map((item) => (
                    <div key={item._id}>
                      <CardLayanan item={item} />
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Layanan Tidak Ditemukan
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

export default LayananPopuler;
