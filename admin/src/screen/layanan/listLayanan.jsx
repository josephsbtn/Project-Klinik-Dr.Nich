/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../assets/component/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmPopUp from "../../assets/component/confirmPopUp";
import CardJenisLayanan from "../../assets/component/cardJenisLayanan";
import CardLayanan from "../../assets/component/CardLayanan";

function ListLayanan() {
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState([]);
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [jenis, setJenis] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/layanan/getAllLayanan");
      const jenisLayanan = await axios.get("/api/layanan/getAllJenisLayanan");
      console.log("Fetched data before sorting:", jenisLayanan.data);
      const sortedLayanan = response.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      const sortedJenisLayanan = jenisLayanan.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setJenisLayanan(sortedJenisLayanan);
      setLayanan(sortedLayanan);
      console.log("Fetched data:", sortedJenisLayanan);
      setLayanan(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Djenis = {
      nama: jenis,
      foto: image,
    };
    try {
      const res = (await axios.post("/api/layanan/tambahJenisLayanan", Djenis))
        .data;
      console.log(res);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  function convertBase64(e) {
    const file = e.target.files[0];
    if (!file) {
      setError("No image selected.");
      return false;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum file size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      setError("Failed to process the image.");
    };
  }

  return (
    <>
      <main className="container h-auto flex flex-col items-center">
        <Navbar />
        <section className="w-full pt-32 pb-20 flex flex-col items-center">
          <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
            <h1 className="w-full text-center text-xl mb-4 font-bold">
              Jenis Layanan
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                {image ? (
                  <img
                    src={image}
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
              <input
                type="text"
                placeholder="Jenis Layanan"
                className="w-full p-2 border rounded-md mt-4"
                onChange={(e) => setJenis(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4">
                Submit
              </button>
            </form>
          </ConfirmPopUp>

          <section className="container flex flex-col items-center w-[90%] ">
            <h1 className="text-3xl font-bold text-center">Jenis Layanan</h1>
            <div className="grid w-fit grid-cols-2 gap-4 items-center justify-center xl:grid-cols-5 sm:grid-cols-2 mt-4">
              {Array.isArray(jenisLayanan) ? (
                jenisLayanan.map((item) => (
                  <div key={item._id}>
                    <CardJenisLayanan item={item} />
                  </div>
                ))
              ) : (
                <p>Data is not in the expected format.</p>
              )}
            </div>
          </section>

          <h1 className="text-3xl font-bold text-center">Layanan Kami</h1>
          <div className="flex flex-col space-y-2">
            {Array.isArray(layanan) ? (
              layanan.map((layananItem, index) => (
                <CardLayanan key={index} item={layananItem} />
              ))
            ) : (
              <p>Data is not in the expected format.</p>
            )}
          </div>

          <div className="fixed space-x-4 flex right-0 bottom-0 p-4 rounded-lg">
            <button
              onClick={() => navigate("/layanan/tambahLayanan")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Layanan
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tambah Jenis Layanan
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ListLayanan;
