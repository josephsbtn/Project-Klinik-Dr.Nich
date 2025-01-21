import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Navbar and Footer
import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";

// Layanan and Produk Components
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";

// Card Product
import CardProduct from "../../components/kategoriProductCard.jsx";

// Assets
import arrow from "../../assets/arrow-right.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import banner1 from "../../assets/img-produk/banner.png";
import banner2 from "../../assets/img-produk/banner2.png";
import axios from "axios";

// Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

function Produk() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getAllkategoriProduk`
        )
      ).data;
      const resCarousel = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getImage`
        )
      ).data;

      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setCarousel(resCarousel);
      setContent(sorted);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full flex-col items-center">
      <Navbar selected={"Produk"} />
      <div className="flex items-center w-[90%] justify-start space-x-2 mx-auto mt-[18px] lg:mx-[120px]">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs text-disable-text font-normal">
          Produk
        </a>
      </div>

      <div className="flex items-center w-[100%] justify-center space-x-2 mx-auto mt-[18px] lg:w-[90%] lg:h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full h-auto rounded-lg">
          {carousel.length > 0 ? (
            carousel.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center text-lg font-semibold w-full">
                  <img
                    className="w-[80%] h-[158px] lg:w-full lg:h-[528.36px] rounded-[10px] object-cover"
                    src={item.image} // Ensure 'imageUrl' matches the key in your API response
                    alt={`Carousel Image ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="flex items-center justify-center w-full">
              <p>No images available</p>
            </div>
          )}
        </Swiper>
      </div>

      <div className=" items-center w-[90%] justify-center mt-10 mx-auto lg:mt-28 lg:mx-auto gap-8   lg:gap-20 grid grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-secondary font-medium">
              Loading...
            </h1>
          </div>
        ) : error ? (
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="font-SFPro text-base text-red-800 font-medium">
              {error}
            </h1>
          </div>
        ) : (
          content.map((item) => (
            <div key={item._id}>
              <CardProduct item={item} />
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-4 items-center w-[90%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
        <section className="lg:w-full w-full">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Produk;
