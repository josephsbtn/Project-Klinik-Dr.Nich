/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../assets/component/navbar";
import axios from "axios";

function ListPromo() {
  const [promo, setPromo] = useState([]);
  const fetchPromo = async () => {
    try {
      const response = await axios.get("/api/promo/getAllPromo");
      const data = response.data;

      if (Array.isArray(data)) {
        setJenisLayanan(data);
      } else {
        console.error("Invalid response format:", data);
        setError("Failed to load jenis layanan.");
      }
    } catch (err) {
      console.error("Error fetching jenis layanan:", err);
      setError("Failed to fetch jenis layanan. Please try again later.");
    }
  };
  return (
    <>
      <main className="flex flex-col container ">
        <Navbar />
        <section className="w-full pt-32 pb-20 flex flex-col items-center"></section>
      </main>
    </>
  );
}

export default ListPromo;
