/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
function ProdukCard({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-[184px] h-[276px] relative flex items-center justify-center"
        onClick={() => navigate(`/produk/detailProduk/${item._id}`)}>
        <div className="w-[184px] h-[276px] rounded-[10px] p-2 lg:p-3 bg-white border border-disable-line flex flex-col">
          <img
            src={item.foto}
            className="w-[173px] h-[167px] mx-auto mt-1 rounded-xl"
            alt=""
          />
          <p className="w-[166px] text-[#464646] text-left text-sm mx-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
            {item.nama}
          </p>
          {/* type shi */}
          <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
            <p>{item.kategori?.name}</p>
            <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
            <p>{item.tipeProduk?.nama}</p>
          </div>
          {/* harga */}
          <div className="flex items-center gap-2 mx-2 text-[#c2a353] my-2 text-base font-bold font-SFPro leading-tight tracking-tight">
            <p>Rp {item.harga?.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdukCard;
