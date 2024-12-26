/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../assets/component/navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmPopUp from "../../assets/component/confirmPopUp";

function EditJenisLayanan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJenisLayanan = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/layanan/getJenisLayananById/${id}`
        );
        setNama(response.data.nama);
        setImage(response.data.foto);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJenisLayanan();
  }, [id]); // Add `id` as dependency to avoid infinite re-render

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/layanan/deleteJenisLayanan/${id}`);
      navigate("/layanan");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Djenis = {
      nama: nama,
      foto: image,
    };

    try {
      setIsLoading(true);
      const res = await axios.put(
        `/api/layanan/updateJenisLayanan/${id}`,
        Djenis
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/layanan`); // Navigate to another page after success (optional)
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
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
    <section className="container flex flex-col items-center">
      <Navbar />
      <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
        <p className=" w-96 text-center">
          Yakin ingin menghapus jenis layanan ini?
          <br />
          <br />
          Semua data layanan yang terkait dengan jenis layanan ini akan ikut
          terhapus.
        </p>

        <div>
          <button onClick={handleDelete}>DELETE</button>
        </div>
      </ConfirmPopUp>
      {isLoading ? (
        <section className="h-screen w-full flex justify-center items-center">
          <p>Loading...</p>
        </section>
      ) : (
        <main className="w-[90%] flex justify-center items-center pt-24 lg:mt-24 h-screen">
          <div className="w-fit p-5 flex flex-col items-center justify-center border rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Edit Jenis Layanan
            </h3>
            {error && (
              <div className="text-red-500 mb-4">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="text-green-500 mb-4">
                <p>Jenis Layanan successfully updated!</p>
              </div>
            )}

            <form
              className="flex flex-col lg:flex-row justify-center items-center space-y-4 space-x-8"
              onSubmit={handleSubmit}>
              <div className="flex flex-col">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-auto h-72 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md font-montserrat flex items-center justify-center text-gray-600">
                    + Add Image
                  </div>
                )}
              </div>

              <div className="flex space-y-8 justify-between flex-col">
                <div className="flex space-y-8 flex-col">
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Jenis Layanan"
                    className="px-4 py-2 border rounded-md"
                  />
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="px-4 py-2 bg-red-600 font-montserrat text-white rounded-md">
                      Remove Image
                    </button>
                    <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
                      Add Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={convertBase64}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 h-fit bg-green-600 font-montserrat text-white rounded-md">
                  Update Layanan
                </button>
              </div>
            </form>
            <button
              className="px-4 py-2 h-fit bg-red-600 mt-4 font-montserrat text-white rounded-md"
              onClick={() => setOpen(true)}>
              Delete Layanan
            </button>
          </div>
        </main>
      )}
    </section>
  );
}

export default EditJenisLayanan;
