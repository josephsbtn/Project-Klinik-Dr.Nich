import React, { useEffect } from "react";
import Navbar from "../../assets/component/navbar";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function LayananUD() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [idJenis, setIdJenis] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  const [jenisLayanan, setJenisLayanan] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchJenisLayanan = async () => {
      try {
        const { data } = await axios.get("/api/layanan/getAllJenisLayanan");
        setJenisLayanan(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJenisLayanan();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/layanan/updateLayanan/${id}`, {
        nama,
        durasi,
        harga,
        deskripsi,
        idJenis,
        image,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function convertBase64(e) {
    const file = e.target.files[0];
    if (!file) {
      setError(true);
      console.log("No image selected");
      return false;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 5MB.");
      return;
    }
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <main className="container h-screen flex flex-col items-center">
        <Navbar />
        <section className="w-full">
          <div
            className="h-screen w-full p-10 flex items-center justify-center"
            onClick={() => setOpen(false)}>
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 w-full mt-10">
              <div className="w-full lg:w-1/4 p-5 border rounded-md shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-4 font-montserrat">
                  Product Image
                </h3>
                <div className="flex flex-col space-y-4">
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded Preview"
                      className="w-full h-80 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat  flex items-center justify-center text-gray-600">
                      + Add Image
                    </div>
                  )}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setImage("")}
                      className="px-4 py-2 bg-red-600 font-montserrat  text-white rounded-md">
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

              <div className="w-full lg:w-3/4 p-5 border rounded-md bg-white shadow-md">
                <h3 className="text-xl font-montserrat font-semibold mb-4">
                  General Information
                </h3>
                {error && <p className="text-red-500">{error}</p>}
                <form
                  onSubmit={submitHandler}
                  className="flex flex-col space-y-4">
                  <div>
                    <label className="block font-montserrat text-gray-700 mb-1">
                      Nama Layanan
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md font-montserrat"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 mb-1 font-montserrat">
                        Jenis Layanan
                      </label>
                      <select
                        className="w-full p-2 border font-montserrat rounded-md"
                        value={idJenis}
                        onChange={(e) => setIdJenis(e.target.value)}>
                        <option value="">Pilih Jenis Layanan</option>
                        {jenisLayanan.map((jenis) => (
                          <option
                            className="font-montserrat text-sm"
                            value={jenis._id}
                            key={jenis._id}>
                            {jenis.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Harga
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border font-montserrat rounded-md"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-montserrat mb-1">
                        Durasi
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border font-montserrat rounded-md"
                        value={durasi}
                        onChange={(e) => setDurasi(e.target.value)}
                        placeholder="Masukan Durasi Layanan"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Product Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md font-montserrat"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Enter product description"
                      rows="4"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-1 rounded-xl font-montserrat font-medium ">
                    Tambah Layanan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LayananUD;
