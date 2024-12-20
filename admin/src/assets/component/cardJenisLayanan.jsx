/* eslint-disable react/prop-types */
import React from "react";
import ArrowRight from "../icon/ArrowRight.jsx";

function CardJenisLayanan({ item }) {
  return (
    <div className="flex flex-col w-[127px] lg:w- max-w-[230px] h-auto bg-white p-4 rounded-lg justify-center items-center border border-gray-200 shadow-sm">
      <img
        src={item.foto}
        alt={item.nama}
        className="w-full h-[141px] lg:[180px] object-cover rounded-md"
      />
      <div className="flex justify-between items-center w-full mt-2">
        <h1 className="font-medium text-base sm:text-sm text-text  truncate">
          {item.nama}
        </h1>
        <ArrowRight />
      </div>
    </div>
  );
}

export default CardJenisLayanan;
