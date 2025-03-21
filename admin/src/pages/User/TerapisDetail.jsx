import { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineRight, AiOutlineWhatsApp } from "react-icons/ai";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import wa from "../../assets/wa.svg";
import axios from "axios";

export const TerapisDetail = () => {
  const { setNav, setSort, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  const navigasi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/terapis/" + id)
        .then((response) => setDatax(response.data));
    };
    fetchData();
    //fetch("localhost:8181/api/pelanggan").then(
    // (response) => response.json()
    //).then((data)=>(setdatax(data)
    //))
    setNav("Terapis");
    setSort(false)
    setLink('/pos/terapis')
  }, []);

  const handleDelete = async () => {
    await axios
      .delete(`https://api.drnich.co.id/api/pos/user/deleteterapis/${id}`)
      .then((response) => response.status == 200 && navigasi("../terapis"));
  };
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-9">
      <div className="flex flex-col gap-1 px-3 mx-1 rounded-xl border border-[#C2A353] pt-2">
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Nama
        </label>
        <p className="text-start font-semibold h-[30px]">{datax.namaTerapis}</p>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Alamat
        </label>
        <p className="text-start font-semibold h-[30px]">{datax.alamat}</p>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Nomor Telepon
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(`https://wa.me/` + datax.nomorTelepon, "_blank");
          }}
          className="flex items-center gap-1 w-fit"
        >
          <span>
            <img src={wa} />
          </span>
          <p className="flex items-center text-start font-semibold h-[30px]">
            {datax.nomorTelepon}
          </p>
        </button>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Foto
        </label>
        <div className="max-w-[300px] mx-auto h-auto mb-2">
          <img src={"https://api.drnich.co.id/" + datax.image} />
        </div>
      </div>
      <div className="text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>
      <div className="flex flex-col gap-1 px-3 mx-1 rounded-xl border border-[#C2A353]  pt-2">
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Nama Pemilik Rekening
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datax.namaRekening}
        </p>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Bank
        </label>
        <p className="text-start font-semibold h-[30px]">{datax.bank}</p>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Nomor Rekening
        </label>
        <p className="text-start font-semibold h-[30px]">
          {datax.nomorRekening}
        </p>
        <label className="text-start text-[#BDBDBD] text-[12px]">
          Keterangan
        </label>
        <p className="text-start font-semibold h-[30px]">{datax.keterangan}</p>
      </div>
      <div className="mx-1 flex flex-col gap-3">
        <div className="flex gap-5 w-full justify-between text-[14px]">
          <div className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px]">
            <button className="bg-white text-[#C2A353]">Hapus</button>
          </div>
          <Link
            to={{ pathname: `/pos/terapisUpdate/${id}` }}
            className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px]"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
