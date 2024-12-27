/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./ArrowRight";
function SecondCardLayanan({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-32 lg:w-[355px] lg:h-[276px]  flex space-x-2 justify-start cursor-pointer items-center border border-disable-line rounded-lg p-3 shadow-sm bg-white"
      onClick={() => navigate(`/layanan/updateLayanan/${item._id}`)}>
      <img
        src={item.image}
        alt={item.nama}
        className="w-20 h-28 lg:w-full lg:h-[174px] object-cover rounded-md py-1"
      />

      <div className="flex flex-col justify-between items-start  lg:mt-2 space-y-1  w-full h-24">
        <div className="w-full">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-sm lg:text-base font-medium font-SFPro text-secondary leading-5 ">
              {item.nama}
            </h1>
            <ArrowRight className="w-4 h-4 text-gold" />
          </div>

          {/* Apply 2-line clamp */}
          <p className="text-xs lg:text-sm text-text mt-1 font-normal leading-4 line-clamp-2">
            {item.deskripsi}
          </p>
        </div>

        <h1 className="text-gold mt-4 text-base lg:text-base font-medium text-secondary font-SFPro">
          Rp {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default SecondCardLayanan;
