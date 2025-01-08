import React from "react";

export default function PromoCard({ item }) {
  const { nama, detail, foto } = item;

  return (
    <div className="w-[311px] h-[439px] flex flex-col mx-auto items-center border border-[#efefef] rounded-lg shadow-sm my-8">
      <img
        className="w-full h-[328px] rounded-[5px] object-cover opacity-90"
        src={foto || "https://via.placeholder.com/80"} // Fallback jika foto tidak tersedia
        alt={nama || "Thumbnail"}
      />
      <div className="ml-3 flex flex-col">
        <span className="text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight">
          {nama || "Nama Promo"}
        </span>
        <p className="text-[#bdbdbd] text-xs font-normal font-SFPro leading-[20px] tracking-tight mt-1 line-clamp-1">
          {detail || "Detail promo tidak tersedia"}
        </p>
      </div>
    </div>
  );
}
