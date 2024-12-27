import React, { useEffect, useState } from "react";
import CardLayanan from "./CardLayanan";
import axios from "axios";

function LayananPopuler() {
  const [layanan, setLayanan] = useState();
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const resLayanan = (await axios.get("/api/layanan/getAllLayanan")).data;

      const sorted = resLayanan.sort(
        (a, b) => a.reservedCount - b.reservedCount
      );
      setLayanan(sorted);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="w-full flex flex-col items-center lg:items-start py-2">
        <div className="flex justify-between items-center w-full ">
          <h1 className="font-SFPro lg:text-xl text-start text-text font-medium text-base">
            Layanan Populer
          </h1>
          <h1 className="font-SFPro lg:text-base text-start text-secondary font-normal text-sm">
            lihat semua
          </h1>
        </div>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="flex max-w-full  justify-start space-x-4 mt-4 overflow-x-scroll lg:overflow-hidden ">
            {layanan && layanan.length > 0 ? (
              layanan.slice(0, 3).map((item) => (
                <div key={item._id}>
                  <CardLayanan item={item} />
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default LayananPopuler;
