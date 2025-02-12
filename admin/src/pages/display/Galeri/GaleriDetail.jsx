import { useContext, useEffect, useState } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const GaleriDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lokasi = useLocation();
  const dummyData = lokasi.state;
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/gallery/getGaleriById/${id}`
      );
      setdatax(response.data);
      console.log("data: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGallery = async () => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/gallery/deleteGaleri/${id}`
      );
      navigate("/galeri");
    } catch (error) {
      console.error("Error deleting promo:", error.message);
    }
    console.log("Delete promo with id:", id);
  };

  useEffect(() => {
    fetchData();
    setNav("Detail");
  }, []);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 gap-5">
        <div className="flex flex-col text-[12px] w-full gap-2 border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={gkategori} alt="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Judul</p>
            <p className="text-[#454545]">{datax.judul}</p>
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">link</p>
            <p className="text-[#454545]">{datax.link}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Nama channel</p>
            <p className="text-[#454545]">{datax.channel}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Sosial Media</p>
            <p className="text-[#454545]">{datax.sosmed}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{datax.desrkipsi}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <a
            href=""
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text">
            Hapus{" "}
          </a>
          <Link
            to={{ pathname: "/UpdateGaleri" }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] ">
            Edit
          </Link>
        </div>
      </div>
      <button
        className="w-10 h-10 bg-black/300 text-white"
        onClick={() => {
          setdatax([]);
        }}>
        RESET
      </button>
    </div>
  );
};

export default GaleriDetail;
