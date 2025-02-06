import React from "react";

import axios from "axios";

function galeriCard({ item }) {
  return (
    <div className="w-screen h-fit flex items-center justify-start border py-2 border-[#efefef] lg:w-[433px] rounded-[10px]">
      <div className=""></div>
      <div className="relative w-32 h-32 ml-4">
        <img
          className="w-full h-full rounded-[5px] opacity-90 object-cover"
          src={item.thumbnail}
          alt="Thumbnail"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-55 rounded-[5px]"></div>
      </div>

      <div className="ml-5 flex flex-col">
        <span className="text-[#464646] text-sm lg:text-lg font-normal font-SFPro leading-[25px] tracking-tight">
          {item.judul}
        </span>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.deskripsi}</span>
        </div>
        <div className="flex items-center mt-2 text-[#bdbdbd] text-sm lg:text-base font-normal font-SFPro leading-[25px] tracking-tight">
          <span>{item.sosmed}</span>
          <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] lg:text-base rounded-full"></div>
          <span>{item.channel}</span>
        </div>
      </div>
    </div>
  );
}

export default galeriCard;
