/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListProduct() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);

  const [selectedContent, setSelectedContent] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/produk/getAllproduk");
      const data = response.data;
      if (Array.isArray(data)) {
        const sortedData = response.data.sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setProduk(sortedData);
        setLoading(false);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching promo:", err.message);
      setError(
        "Failed to fetch promo. Please try again later." +
          err.response?.data.message
      );
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const deleteGaleri = () => {
    try {
      const response = axios.delete(
        `/api/produk/deleteproduk/${selectedContent._id}`
      );
      window.location.reload();
      fetchProduct();
    } catch (error) {
      console.error("Error deleting promo:", error.message);
      setError("Failed to delete promo. Please try again later.");
    }
    console.log("Delete promo with id:", selectedContent._id);
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    navigate(`/editProduk/${item._id}`);
    console.log("Edit promo with id:", item._id);
  };

  const handleDelete = (item, e) => {
    e.preventDefault();
    setConfirmOpen(true);
    setSelectedContent(item);
  };

  return (
    <main className="flex flex-col container">
      <Navbar selected={"/produk"} />
      <ConfirmPopup open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="flex flex-col space-y-4 p-8 bg-white rounded-md shadow-md">
          <h1>Anda yakin ingin menghapus ini?</h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setConfirmOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => (setConfirmOpen(false), deleteGaleri())}
              className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </ConfirmPopup>
      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">List Product</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mt-5">
          {produk.length > 0
            ? produk.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <span className="font-SFPro font-normal text-base text-text line-clamp-1">
                    {item.nama}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleEdit(item, e)}
                      className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md">
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(item, e)}
                      className="bg-red-500 text-sm text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : !error && (
                <div className="text-gray-500 mt-8">
                  No promotions available
                </div>
              )}
        </div>

        <div className="fixed right-0 bottom-0 p-4 z-0">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/tambahproduk")}>
            Add Product
          </button>
        </div>
      </section>
    </main>
  );
}

export default ListProduct;
