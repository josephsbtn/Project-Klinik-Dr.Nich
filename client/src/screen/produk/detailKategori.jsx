import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Navbar and Footer
import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";

// Popup
import ConfirmPopUp from "../../components/confirmPopUp.jsx";

// Other Components
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ProdukCard from "../../components/ProductCard2.jsx";
import CloseIcon from "../../assets/close-circle.svg";

function DetailKategori() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productType, setProductType] = useState([]);
  const [jenisKulit, setJenisKulit] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterSkin, setFilterSkin] = useState("all");

  const [content, setContent] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(false);
      setError(""); // Clear any previous error

      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/getProductByCategory/${id}`
      );

      const dataCategory = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/getCategoryById/${id}`
      );

      const productType = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getAllproductType`
        )
      ).data;
      const tipeKulit = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAlltipeKulit`
        )
      ).data;

      setProductType(productType);
      setJenisKulit(tipeKulit);
      setCategory(dataCategory.data.name);
      const sorted = response.data.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setContent(sorted);
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full fixed z-30">
        <Navbar selected="Produk" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex items-center w-[90%] lg:w-4/5  justify-start space-x-2 mt-4 pt-20 ">
            <a
              onClick={() => navigate("/")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Beranda
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate("/produk")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Produk
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate(`/produk/kategori/${id}`)}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              {category}
            </a>
          </div>

          <ConfirmPopUp
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}>
            <div className="flex flex-col items-center  w-screen h-screen">
              <div className="w-[85%] flex justify-end items-center mt-10">
                <button onClick={() => setIsFilterOpen(false)} className="">
                  <img src={CloseIcon} alt="Close" className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col items-start space-y-2  w-[85%]">
                <h1 className="text-base font-medium font-SFPro text-secondary ">
                  Jenis Kulit
                </h1>
                <div className="grid grid-cols-2 w-[90%]">
                  {jenisKulit ? (
                    jenisKulit.map((item) => (
                      <div
                        className="flex items-center space-x-2"
                        key={item._id}>
                        <input
                          type="radio"
                          name="jenisKulit"
                          value={item.name}
                          onChange={(e) => setFilterSkin(e.target.value)}
                          checked={filterSkin === item.name}
                          key={item._id}
                        />
                        <label className="text-sm font-normal font-SFPro text-text">
                          {item.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">Loading...</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start space-y-2  w-[85%]">
                <h1 className="text-base font-medium font-SFPro text-secondary ">
                  Jenis Kulit
                </h1>
                <div className="grid grid-cols-2 w-[90%]">
                  {productType ? (
                    productType.map((item) => (
                      <div
                        className="flex items-center space-x-2"
                        key={item._id}>
                        <input
                          type="radio"
                          name="productType"
                          value={item.name}
                          onChange={(e) => setFilterType(e.target.value)}
                          checked={filterType === item.name}
                          key={item._id}
                        />
                        <label className="text-sm font-normal font-SFPro text-text">
                          {item.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </ConfirmPopUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-[90%] lg:w-[80%] gap-4 mt-[18px]">
            {loading ? (
              <div className="col-span-full text-center">
                Loading products...
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : content.length > 0 ? (
              content.map((item) => (
                <div key={item._id}>
                  <ProdukCard item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                No products available
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 items-center w-[90%] lg:w-[80%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
            {/* Popular Services */}
            <section className="lg:w-full w-full">
              <LayananPopuler />
            </section>

            {/* Latest Products */}
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}

export default DetailKategori;
