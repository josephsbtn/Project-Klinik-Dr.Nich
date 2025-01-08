import React, { useEffect, useState } from "react";
import CardLayanan from "./CardLayanan";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LayananPopuler() {
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState();
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const resLayanan = (await axios.get("/api/layanan/getAllLayanan")).data;

      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
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
        <div className="flex justify-between items-center w-full lg:py-6">
          <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
            Treatment Populer
          </h1>
          <h1 className="font-SFPro text-xs text-secondary font-medium lg:text-base">
            Lihat Semua
          </h1>
        </div>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="flex max-w-full justify-start space-x-4 mt-4 overflow-x-scroll overflow-y-hidden z-0">
            {layanan && layanan.length > 0 ? (
              layanan.slice(0, 4).map((item) => (
                <div key={item._id}>
                  <CardLayanan
                    item={item}
                    onClick={() =>
                      navigate(`/layanan/detailTreatment/${item._id}`)
                    }
                  />
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
