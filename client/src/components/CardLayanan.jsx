
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./ArrowRight.jsx";

function CardLayanan({ item, path }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[184px] h-72 lg:w-[355px] lg:h-[276px]  flex flex-col justify-start cursor-pointer items-center border border-disable-line rounded-lg p-1 shadow-sm bg-white
       duration-300 transition-all ease-in-out"
      onClick={() => navigate(`/layanan/detailTreatment/${item._id}`)}>
      <img
        src={item.image}
        alt={item.nama}
        className="w-48 h-44 lg:w-full lg:h-[174px] object-cover rounded-md"
      />

      <div className="flex flex-col justify-start items-start lg:mt-2 space-y-1 w-full h-24">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-sm lg:text-base font-normal text-text line  leading-5 ">
            {item.nama}
          </h1>
          <ArrowRight className="w-4 h-4 text-gold" />
        </div>

        {/* Apply 2-line clamp */}
        <p className="text-xs lg:text-sm text-disable-text font-light leading-4 line-clamp-2">
          {item.cardDeskripsi}
        </p>

        <h1 className="text-gold pt-2 text-sm lg:text-base font-semibold text-secondary font-SFPro">
          Rp {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default CardLayanan;
