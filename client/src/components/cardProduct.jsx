import React from 'react'
import { useNavigate } from 'react-router-dom'


function cardProduct({ item }) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center items-center inline-flex gap-4 lg:gap-8">
      onClick={() => navigate("/produk/detail", { state: item })}
      <img
        className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-xl"
        src={item.image}
      />
      <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
        {item.name}
      </p>
    </div>
  )
}

export default cardProduct