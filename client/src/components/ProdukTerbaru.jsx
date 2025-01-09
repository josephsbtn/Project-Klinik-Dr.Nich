import React from "react";

// produk1
import produk1 from "../assets/img-about/produk1.png";

function ProdukTerbaru() {
  return (
    <section className="flex flex-col my-[26px] w-full items-center">
      <main className="w-full flex lg:px-0 px-6 justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Produk Baru!
        </h1>
        <h1 className="font-SFPro text-xs text-secondary font-medium lg:text-base">
          Lihat Semua
        </h1>
      </main>
      <div className="flex flex-col lg:w-full pt-[15px]">
        <div className="flex lg:justify-start justify-center items-center pt-[15px]">
          <div className="carousel carousel-center w-80 lg:w-full space-x-[10px]">
            <div className="carousel-item gap-9 overflow-x-scroll overflow-y-hidden">
              {/* ITEM */}
              {/* item1 */}
              <div className="w-[184px] h-[276px] relative flex items-center justify-center">
                <div className="w-[184px] h-[276px] rounded-[10px] bg-white border border-[#efefef] flex flex-col">
                  <img
                    src={produk1}
                    className="w-[173px] h-[167px] mx-auto mt-1"
                    alt=""
                  />
                  <p className="w-[166px] text-[#464646] text-left text-sm mx-2 my-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                    Dr. Nich Brightening Jelly Pak 10pcs
                  </p>
                  {/* type shi */}
                  <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
                    <p>Skincare</p>
                    <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                    <p>Serum</p>
                  </div>
                  {/* harga */}
                  <div className="flex items-center gap-2 mx-2 my-2 text-[#c2a353] text-base font-bold font-SFPro leading-tight tracking-tight">
                    <p>Rp 110.000</p>
                  </div>
                </div>
              </div>

              {/* item2*/}
              <div className="w-[184px] h-[276px] relative flex items-center justify-center">
                <div className="w-[184px] h-[276px] rounded-[10px] bg-white border border-[#efefef] flex flex-col">
                  <img
                    src={produk1}
                    className="w-[173px] h-[167px] mx-auto mt-1"
                    alt=""
                  />
                  <p className="w-[166px] text-[#464646] text-left text-sm mx-2 my-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                    Dr. Nich Brightening Jelly Pak 10pcs
                  </p>
                  {/* type shi */}
                  <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
                    <p>Skincare</p>
                    <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                    <p>Serum</p>
                  </div>
                  {/* harga */}
                  <div className="flex items-center gap-2 mx-2 my-2 text-[#c2a353] text-base font-bold font-SFPro leading-tight tracking-tight">
                    <p>Rp 110.000</p>
                  </div>
                </div>
              </div>

              {/* item3 */}
              <div className="w-[184px] h-[276px] relative flex items-center justify-center">
                <div className="w-[184px] h-[276px] rounded-[10px] bg-white border border-[#efefef] flex flex-col">
                  <img
                    src={produk1}
                    className="w-[173px] h-[167px] mx-auto mt-1"
                    alt=""
                  />
                  <p className="w-[166px] text-[#464646] text-left text-sm mx-2 my-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                    Dr. Nich Brightening Jelly Pak 10pcs
                  </p>
                  {/* type shi */}
                  <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
                    <p>Skincare</p>
                    <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                    <p>Serum</p>
                  </div>
                  {/* harga */}
                  <div className="flex items-center gap-2 mx-2 my-2 text-[#c2a353] text-base font-bold font-SFPro leading-tight tracking-tight">
                    <p>Rp 110.000</p>
                  </div>
                </div>
              </div>

              {/* item4 */}
              {/* item3 */}
              <div className="w-[184px] h-[276px] relative flex items-center justify-center">
                <div className="w-[184px] h-[276px] rounded-[10px] bg-white border border-[#efefef] flex flex-col">
                  <img
                    src={produk1}
                    className="w-[173px] h-[167px] mx-auto mt-1"
                    alt=""
                  />
                  <p className="w-[166px] text-[#464646] text-left text-sm mx-2 my-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                    Dr. Nich Brightening Jelly Pak 10pcs
                  </p>
                  {/* type shi */}
                  <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
                    <p>Skincare</p>
                    <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                    <p>Serum</p>
                  </div>
                  {/* harga */}
                  <div className="flex items-center gap-2 mx-2 my-2 text-[#c2a353] text-base font-bold font-SFPro leading-tight tracking-tight">
                    <p>Rp 110.000</p>
                  </div>
                </div>
              </div>

              {/* item5 */}
              {/* item3 */}
              <div className="w-[184px] h-[276px] relative flex items-center justify-center">
                <div className="w-[184px] h-[276px] rounded-[10px] bg-white border border-[#efefef] flex flex-col">
                  <img
                    src={produk1}
                    className="w-[173px] h-[167px] mx-auto mt-1"
                    alt=""
                  />
                  <p className="w-[166px] text-[#464646] text-left text-sm mx-2 my-2 font-normal font-['SF Pro Display'] leading-tight tracking-tight">
                    Dr. Nich Brightening Jelly Pak 10pcs
                  </p>
                  {/* type shi */}
                  <div className="flex items-center gap-2 mx-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
                    <p>Skincare</p>
                    <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                    <p>Serum</p>
                  </div>
                  {/* harga */}
                  <div className="flex items-center gap-2 mx-2 my-2 text-[#c2a353] text-base font-bold font-SFPro leading-tight tracking-tight">
                    <p>Rp 110.000</p>
                  </div>
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
