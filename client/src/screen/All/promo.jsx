import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";
import galeriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import axios from "axios";

// promo
import PromoCard from "../../components/promoCard.jsx";

// IMAGE AND ICON
import arrow from "../../assets/arrow-right.svg";

function promo() {

    const [content, setContent] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty("--progress", 1 - progress);
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    // FETCH DATA
    const fetchData = async () => {
        try {
            setLoading(true);
            const resLayanan = (await axios.get("/api/promo/getAllPromo")).data;

            const sorted = resLayanan.sort(
                (a, b) => b.reservedCount - a.reservedCount
            );
            console.log(sorted)
            setContent(sorted);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar selected={"Galeri"} />
            <div className="mt-[18px]">
                <div className="flex-col">
                    <div className="flex gap-[6px] mx-[25px] lg:mx-[120px]">
                        <a className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
                            Beranda
                        </a>
                        <img src={arrow} alt="" />
                        <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
                            Promo
                        </p>
                    </div>
                </div>
            </div>

            {/* Promo */}
            <div>
                {content &&
                    content.map((item) => (
                        <div key={item._id}>
                            <PromoCard item={item} />
                        </div>
                    ))}
            </div>

            <div className="flex flex-col gap-4 z-0">
            {/* Layanan */}
            <section className="lg:w-full w-[full]">
              <LayananPopuler />
            </section>
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
            <Footer />
        </>
    )
}

export default promo