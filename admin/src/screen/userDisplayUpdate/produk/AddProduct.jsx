/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/component/navbar";
import axios from "axios";
import ConfirmPopUp from "../../../assets/component/confirmPopUp";

function AddProduct() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [productType, setProductType] = useState([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState("");
  const [manfaat, setManfaat] = useState("");
  const [caraPakai, setCaraPakai] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [tipeProduk, setTipeProduk] = useState("");

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resCat = await axios.get("/api/produk/getAllkategoriProduk");
        const resType = await axios.get("/api/produk/getAllproductType");
        if ((resCat === undefined || null) && (resType === undefined || null)) {
          throw new Error("Data null / undefined");
        }
        setCategoryProduct(resCat.data);
        setProductType(resType.data);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "An error occurred",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Validate all required fields
      if (
        !nama.trim() ||
        !deskripsi.trim() ||
        !image ||
        !manfaat.trim() ||
        !caraPakai.trim() ||
        !harga.trim() ||
        !tipeProduk
      ) {
        throw new Error("Please fill in all fields");
      }

      // Ensure the price is a valid number
      if (isNaN(harga) || parseFloat(harga) <= 0) {
        throw new Error("Please enter a valid price");
      }

      // Prepare payload
      const payload = {
        nama,
        deskripsi,
        foto: image,
        manfaat,
        cara_pakai: caraPakai,
        harga: parseFloat(harga), // Ensure price is sent as a number
        kategori,
        tipeProduk,
      };

      // Send data to the server
      const { data } = await axios.post("/api/produk/tambahproduk", payload);

      // Show success message
      showMessage(data.message || "Product added successfully", "success");

      // Optionally, reset form fields after successful submission
      setNama("");
      setDeskripsi("");
      setImage("");
      setManfaat("");
      setCaraPakai("");
      setHarga("");
      setKategori("");
      setTipeProduk("");
    } catch (error) {
      // Show error message
      showMessage(
        error.response?.data?.message || error.message || "An error occurred",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 10000);
  };

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      showMessage("No image selected", "error");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      showMessage(
        "Invalid file type. Only JPEG and PNG files are allowed.",
        "error"
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      showMessage("File is too large. Maximum file size is 5MB.", "error");
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
        <Navbar />
        <section className="w-full lg:pt-20  flex flex-col items-center justify-center min-h-screen ">
          {message && (
            <div className="w-full flex items-center justify-center">
              <div
                className={`${
                  messageType === "error" ? "bg-red-500" : "bg-green-500"
                } text-white px-4 py-2 rounded-md`}>
                {message}
              </div>
            </div>
          )}
          <div className="w-[90%] p-4 pt-4 h-auto  flex items-start space-x-4">
            <div className="w-full h-[90%] lg:w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Product Image
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
              className="flex flex-col w-full h-full lg:w-3/4 items-center justify-center rounded-3xl">
              <div className="w-full h-full space-x-4 flex justify-center items-center">
                <div className="w-full p-5 border rounded-md shadow-md bg-white">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat">
                    Product Details
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
                  </div>
                </div>
                <div className="w-full p-5 h-full border rounded-md shadow-md bg-white">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Manfaat
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={manfaat}
                        onChange={(e) => setManfaat(e.target.value)}
                        placeholder="Enter content creator channel name "
                        rows="4"
                      />
                    </div>

                    <div className="w-96">
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Harga
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md font-montserrat"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        placeholder="Enter product price"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Kategori Product
                      </label>
                      <select
                        className="w-full p-2 border rounded-md border-disable-line"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}>
                        <option value="" disabled>
                          Select Category Product
                        </option>
                        {categoryProduct.map((cat) => (
                          <option value={cat._id} key={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Product Type
                      </label>
                      <select
                        className="w-full p-2 border rounded-md font-SFPro pt-2"
                        value={tipeProduk}
                        onChange={(e) => setTipeProduk(e.target.value)}>
                        <option className="" value="" disabled>
                          Select Type Product
                        </option>
                        {productType && productType.length > 0 ? (
                          productType.map((cat) => (
                            <option
                              className="font-montserrat text-sm"
                              value={cat._id}
                              key={cat._id}>
                              {cat.name}
                            </option>
                          ))
                        ) : (
                          <option
                            disabled
                            className=" lg:p-2 p-1 rounded-md   ">
                            <p className="font-normal">No Product Type Found</p>
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="p-2 bg-primary w-full text-white font-SFPro mt-4 px-10 rounded-xl">
                Tambah
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddProduct;
