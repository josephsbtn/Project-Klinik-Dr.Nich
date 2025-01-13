/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/component/navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConfirmPopUp from "../../../assets/component/confirmPopUp";

function AddProduct() {
  const { id } = useParams();
  const [categoryProduct, setCategoryProduct] = useState();
  const [productType, setProductType] = useState();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState("");
  const [manfaat, setManfaat] = useState("");
  const [caraPakai, setCaraPakai] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [tipeProduk, setTipeProduk] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resCat = await axios.get(`/api/produk/getAllkategoriProduk`);
        const resType = await axios.get(`/api/produk/getAllproductType`);
        setCategoryProduct(resCat.data);
        setProductType(resType.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        console.log(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/layanan/updateLayanan/${id}`, {
        nama,
        deskripsi,
        image,
        manfaat,
        caraPakai,
        harga,
        kategori,
        tipeProduk,
      });
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/layanan/deleteLayanan/${id}`);
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No image selected");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <main className="container h-screen flex flex-col items-center">
        <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
          Apakah Anda yakin ingin mengubah data produk ini?
          <div className="flex justify-between bg-white mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
              onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md"
              onClick={handleDelete}>
              Edit
            </button>
          </div>
        </ConfirmPopUp>
        <Navbar />
        <section className="w-full lg:pt-14  flex flex-col items-center justify-center min-h-screen ">
          <div className="w-[80%] h-auto bg-blue-400 flex items-start space-x-4">
            <div className="w-full lg:w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Content Thumbnail
              </h3>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-auto h-80 aspect-video object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImage(null)}
                    className="px-4 py-2 bg-red-600 font-montserrat text-white rounded-md">
                    Remove
                  </button>
                  <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                    Add
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={convertBase64}
                    />
                  </label>
                </div>
              </div>
            </div>
            <form
              onSubmit={submitHandler}
              className="flex flex-col w-full lg:w-3/4 items-center justify-center rounded-3xl">
              <div className="w-full space-x-4 flex justify-center items-center">
                <div className="w-full p-5 border rounded-md shadow-md bg-white">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">
                    Content Details
                  </h3>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Name"
                        className="border rounded-md w-full p-2 font-montserrat"
                      />
                    </div>

                    <div className="w-96">
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Product Description
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Enter content link url"
                        rows="4"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Cara Pakai
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={caraPakai}
                        onChange={(e) => setCaraPakai(e.target.value)}
                        placeholder="Enter content creator channel name "
                        rows="4"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Manfaat
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={manfaat}
                        onChange={(e) => setManfaat(e.target.value)}
                        placeholder="Social Media "
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full p-5 h-full border rounded-md shadow-md bg-white">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Name"
                        className="border rounded-md w-full p-2 font-montserrat"
                      />
                    </div>

                    <div className="w-96">
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Product Description
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Enter content link url"
                        rows="4"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Cara Pakai
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={caraPakai}
                        onChange={(e) => setCaraPakai(e.target.value)}
                        placeholder="Enter content creator channel name "
                        rows="4"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Manfaat
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={manfaat}
                        onChange={(e) => setManfaat(e.target.value)}
                        placeholder="Social Media "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="p-2 bg-primary w-full text-white font-SFPro mt-4 px-10 rounded-xl">
                Update
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddProduct;
