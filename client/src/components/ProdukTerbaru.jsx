import React from "react";

function ProdukTerbaru() {
  return (
    <section className="flex flex-col my-[26px] w-full  items-center">
      <main className="w-full  flex lg:px-0 px-6 justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Produk Baru!
        </h1>
        <h1 className="font-SFPro text-xs text-secondary font-medium lg:text-base">
          Lihat Semua
        </h1>
      </main>
      <div className="flex flex-col  lg:w-full pt-[15px]">
        <div className="flex lg:justify-start justify-center items-center  pt-[15px]">
          <div className="carousel carousel-center rounded-box w-80 lg:w-full space-x-[10px]">
            <div className="carousel-item">
              <div className="w-[184px] h-[276px] relative">
                <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                  Untuk kulit berminyak dan rentang berjerawat
                </div>
                <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                  Rp 110.000
                </div>
                <img
                  className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                  src="https://via.placeholder.com/184x174"
                />
                <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                  Facial Glow Acne
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="w-[184px] h-[276px] relative">
                <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                  Untuk kulit berminyak dan rentang berjerawat
                </div>
                <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                  Rp 110.000
                </div>
                <img
                  className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                  src="https://via.placeholder.com/184x174"
                />
                <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                  Facial Glow Acne
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="w-[184px] h-[276px] relative">
                <div className="w-[184px] h-[276px] left-0 top-0 absolute bg-white rounded-[10px] border border-[#efefef]" />
                <div className="w-[166px] left-[10px] top-[197px] absolute text-[#bdbdbd] text-xs font-normal font-['SF Pro Display'] leading-[17px] tracking-tight">
                  Untuk kulit berminyak dan rentang berjerawat
                </div>
                <div className="left-[10px] top-[242px] absolute text-[#c2a353] text-base font-bold font-['SF Pro Display'] leading-tight tracking-tight">
                  Rp 110.000
                </div>
                <img
                  className="w-[184px] h-[174px] left-0 top-0 absolute rounded-[10px] border-4 border-white"
                  src="https://via.placeholder.com/184x174"
                />
                <div className="w-[166px] left-[10px] top-[177px] absolute text-[#464646] text-sm font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                  Facial Glow Acne
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProdukTerbaru;
