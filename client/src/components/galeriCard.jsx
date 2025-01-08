import React from 'react'

import axios from "axios";

function galeriCard() {
  return (
    <div className="w-[375px] h-[100px] flex items-center border border-[#efefef]">
                            <img
                                className="w-20 h-20 rounded-[5px] ml-6 opacity-90"
                                src="https://via.placeholder.com/80x80"
                                alt="Thumbnail"
                            />
                            <div className="ml-3 flex flex-col">
                                <span className="text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                                    Brightening Treatment
                                </span>
                                <div className="flex items-center mt-2 text-[#bdbdbd] text-sm font-normal font-['SF Pro Display'] leading-[25px] tracking-tight">
                                    <span>Youtube</span>
                                    <div className="w-[5px] h-[5px] mx-2 bg-[#efefef] rounded-full"></div>
                                    <span>Dr. Nich Beauty Aesthetic</span>
                                </div>
                            </div>
                        </div>
  )
}

export default galeriCard