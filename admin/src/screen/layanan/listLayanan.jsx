import { useEffect, useState } from "react";
import Navbar from "../../assets/component/navbar";
import axios from "axios";

function ListLayanan() {
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/apilayanan/getAllLayanan");
        console.log("Fetched data:", response.data); // Log to inspect data format
        setLayanan(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="container h-screen flex flex-col items-center">
        <Navbar />
        <section className="w-full">
          <h1 className="text-3xl font-bold text-center">Layanan Kami</h1>
          <div className="flex flex-col space-y-2">
            {Array.isArray(layanan) ? (
              layanan.map((layananItem, index) => (
                <div key={index} className="flex flex-row space-x-2">
                  <p className="font-semibold">{layananItem.nama}</p>
                  {layananItem.foto && (
                    <img
                      src={layananItem.foto}
                      alt={layananItem.nama}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>Data is not in the expected format.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default ListLayanan;
