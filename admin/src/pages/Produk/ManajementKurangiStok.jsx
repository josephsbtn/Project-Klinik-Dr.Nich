import React, { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../App2";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const ManajementKurangiStok = () => {
  const { setNav, setLink } = useContext(navContext);
  const [produk, setProduk] = useState([null]);
  const [fetched, setFetched] = useState(false);
  const [jumlah, setJumlah] = useState(0)
  const jumlahRef = useRef(null);
  const keteranganRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk/" + id)
        .then((response) => {
          response.status == 200 && setFetched(true);
          setProduk(response.data);
        });
    };
    fetch();
    setNav("Kurangi Stok");
    document.title = "Manajemen Kurangi Stok";
    setLink('/pos/manajementStok')
  }, []);

  useEffect(()=>{
    jumlah > produk.stok && setJumlah(produk.stok)
  },[jumlah])
  
  const handleChange = ()  => {
    setJumlah(jumlahRef.current.value)
  }

  const handeSubmit = (e) => {
    e.preventDefault();
    const data = {
      jumlah: jumlahRef.current.value,
      keterangan: keteranganRef.current.value,
      produk: produk._id,
    };

    axios
      .post("https://api.drnich.co.id/api/pos/produk/kurangstokpos", data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      )
      .then(
        (response) =>
          response.status == 200 && navigate(`../ManajementDetailStok/${id}`)
      );
  };

  return (
    <form
      onSubmit={handeSubmit}
      className="flex flex-col px-5 py-3 gap-1 bg-white w-full min-h-screen h-fit pt-8"
    >
      {fetched ? (
        <>
          <div className="grid py-2 place-items-start">
            <label className="text-start text-[12px] text-[#454545] text-sm px-2 py-1">
              Stok Saat Ini
            </label>
            <label
              type="text"
              placeholder=""
              className=" w-full text-start flex items-center text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] "
            >
              {produk.stok}
            </label>
          </div>
          <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] text-sm px-2 py-1">
              Jumlah Pengurangan
            </label>
            <input
              ref={jumlahRef}
              onChange={handleChange}
              value = {jumlah}
              type="number"
              placeholder="0"
              className="w-full text-[12px] mx-3 px-4 border text-sm text-black border-black/30 rounded-xl h-[40px] "
            />
          </div>
          <div className="grid py-2">
            <label className="text-start text-[12px] text-sm text-[#454545] px-2 py-1">
              Keterangan <span className=" text-[#BDBDBD] ">( Optional )</span>
            </label>
            <input
              ref={keteranganRef}
              type="text"
              placeholder="Contoh : Barang Kadaluarsa"
              className="w-full text-[12px] mx-3 px-4 border text-sm text-black border-black/30 rounded-xl h-[40px] "
            />
          </div>
          <div className="flex justify-end items-end gap-2 w-full h-full pt-4 py-3 px-2">
            <button
              type="submit"
              className="flex justify-center items-center w-full gap-2 h-[40px] bg-[#DCDCDC] text-white font-bold rounded-xl"
            >
              {" "}
              Simpan
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};
