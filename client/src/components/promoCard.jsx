import React from "react";

export default function PromoCard({ item }) {
  const { nama, detail, foto } = item;

  return (
    <div className="w-[311px] h-[439px] flex flex-col mx-auto items-center border border-[#efefef] rounded-lg shadow-sm my-8 lg:w-[50%] lg:h-[328px] lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-4">
      <img
        className="w-full h-[328px] rounded-[5px] object-cover opacity-90"
        src={foto || "https://via.placeholder.com/80"} // Fallback jika foto tidak tersedia
        alt={nama || "Thumbnail"}
      />
      <div className="ml-3 flex flex-col w-full h-[111px] lg:w-[90%] lg:h-[328px] items-center justify-center">
        <span className="text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight lg:text-base">
          {nama || "Nama Promo"}
        </span>
        <p className="h-10 text-[#bdbdbd] text-xs font-normal font-SFPro leading-[20px] tracking-tight mt-1 line-clamp-1 lg:text-sm ">
          {detail || "Detail promo tidak tersedia"}
        </p>
      </div>
    </div>
  );
}
