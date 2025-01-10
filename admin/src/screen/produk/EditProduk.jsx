/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../assets/component/navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConfirmPopUp from "../../assets/component/confirmPopUp";

function EditProduk() {
  const { id } = useParams();
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
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJenisLayanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/produk/getprodukbyId/${id}`);
        setJenisLayanan(sortedJenisLayanan);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataLayanan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/produk/getProdukById/${id}`);
        setNama(response.data.nama);
        setDurasi(response.data.durasi);
        setHarga(response.data.harga);
        setDeskripsi(response.data.deskripsi);
        setCardDeskripsi(response.data.cardDeskripsi);
        setIdJenis(response.data.idJenis);
        setImage(response.data.image);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDataLayanan();
    fetchJenisLayanan();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/layanan/updateLayanan/${id}`, {
        nama,
        durasi,
        harga,
        deskripsi,
        idJenis,
        image,
      });
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/layanan/deleteLayanan/${id}`);
      setNama("");
      setDurasi("");
      setHarga("");
      setDeskripsi("");
      setIdJenis("");
      setImage(null);
      setSuccessMessage(res.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false); // Close the confirmation pop-up after delete
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
        <section className="w-full lg:pt-14">
          <div className="w-fit flex items-start space-x-4">
            <div className="w-full lg:w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Content Thumbnail
              </h3>
              <div className="flex flex-col space-y-4">
                {selectedContent ? (
                  <img
                    src={editImage}
                    alt="Uploaded Preview"
                    className="w-full h-80 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setEditImage(null)}
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
              onSubmit={editGaleri}
              className="flex flex-col w-full lg:w-3/4 items-center justify-center rounded-3xl">
              <div className="w-full p-5 border rounded-md shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-4 font-montserrat">
                  Content Details
                </h3>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Content Title
                    </label>
                    <input
                      type="text"
                      value={editJudul}
                      onChange={(e) => setEditJudul(e.target.value)}
                      placeholder="Name"
                      className="border rounded-md w-full p-2 font-montserrat"
                    />
                  </div>

                  <div className="w-96">
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Link Content
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md font-montserrat"
                      value={editLink}
                      onChange={(e) => setEditLink(e.target.value)}
                      placeholder="Enter content link url"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Content Creator Channel
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md font-montserrat"
                      value={editChannel}
                      onChange={(e) => setEditChannel(e.target.value)}
                      placeholder="Enter content creator channel name "
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-montserrat mb-1">
                      Social Media
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md font-montserrat"
                      value={editSosmed}
                      onChange={(e) => setEditSosmed(e.target.value)}
                      placeholder="Social Media "
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="p-2 bg-primary text-white font-SFPro mt-4 px-10 rounded-xl">
                Update
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default EditProduk;
