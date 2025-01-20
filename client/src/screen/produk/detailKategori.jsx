import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

//navbar
import Navbar from "../auth/navbar.jsx";
// footer
import Footer from "../auth/footer.jsx";

// layaran dan produk terbaru
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";

// cardProduct
import CardProduct from "../../components/kategoriProductCard.jsx";

function DetailKategori() {
  const navigate = useNavigate();
  const [filterProductType, setFilterProducType] = useState("");
  const [filterJenisKulit, setFilterJenisKulit] = useState("");
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/promo/getprodukbycategory/${id}`
        )
      ).data;

      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      console.log(sorted);
      setContent(sorted);
      console.log("data :", content);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <Navbar selected={"Produk"} />
      <div className="grid grid-cols-2 w-[90%] lg:w-[80%]">
        {content ? (
          content.map((item) => (
            <div key={item._id}>
              <CardProduct item={item} />
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-center w-[90%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
        {/* Layanan */}
        <section className="lg:w-full w-full">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </div>

      <Footer />
    </>
  );
}

export default DetailKategori;
