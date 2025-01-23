/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";

function ListPromo() {
  const [promo, setPromo] = useState([]);
  const [name, setName] = useState("");
  const [syarat, setSyarat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState("");

  const [editName, setEditName] = useState("");
  const [editSyarat, setEditSyarat] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editImage, setEditImage] = useState("");

  const [selectedPromo, setSelectedPromo] = useState(null);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchPromo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setPromo(data);
        setError("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching promo:", err.message);
      setError("Failed to fetch promo. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  const handleAddPromo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/tambahpromo`,
        {
          nama: name,
          detail: deskripsi,
          syarat: syarat,
          foto: image,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      if (response.status === 200) {
        setOpen(false);
        setPromo((prev) => [...prev, response.data]);
        fetchPromo();
      } else {
        setError("Failed to add promo. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding promo:", err.message);
      setError("Failed to add promo. Please try again later.");
    }
  };

  const deletePromo = () => {
    try {
      const response = axios.delete(
        `/api/promo/deletePromo/${selectedPromo._id}`
      );
      fetchPromo();
      setPromo((prev) => prev.filter((item) => item._id !== selectedPromo._id));
    } catch (error) {
      console.error("Error deleting promo:", error.message);
      setError("Failed to delete promo. Please try again later.");
    }
    console.log("Delete promo with id:", selectedPromo._id);
  };

  const updatePromo = (e) => {
    e.preventDefault();
    try {
      console.log("Edit promo with id:", selectedPromo._id);
      console.log("Edit name:", editName);
      console.log("Edit deskripsi:", editDeskripsi);
      console.log("Edit syarat:", editSyarat);
      console.log("Edit image:", editImage);
      const response = axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/updatepromo/${
          selectedPromo._id
        }`,
        {
          nama: editName,
          detail: editDeskripsi,
          syarat: editSyarat,
          foto: editImage,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      setEditDeskripsi("");
      setEditSyarat("");
      setEditName("");
      setEditImage("");
      window.location.reload();
      fetchPromo();
      setEditing(false);
    } catch (error) {
      console.error("Error editing promo:", error.message);
      setError("Failed to edit promo. Please try again later.");
    }
    console.log("Edit promo with id:", selectedPromo._id);
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    setEditing(true);
    setSelectedPromo(item);
    setEditName(item.nama);
    setEditSyarat(item.syarat);
    setEditDeskripsi(item.detail);
    setEditImage(item.foto);
    console.log("Edit promo with id:", item._id);
  };

  const handleDelete = (item, e) => {
    e.preventDefault();
    setConfirmOpen(true);
    setSelectedPromo(item);
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
      if (editing) setEditImage(reader.result);
      else setImage(reader.result);
    };
  };

  return (
    <main className="flex flex-col container">
      <Navbar selected={"/listpromo"} />
      <ConfirmPopup open={open} onClose={() => setOpen(false)}>
        <div className="w-fit flex space-x-4">
          <div className="w-full lg:w-fit p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Promo Image
            </h3>
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
          </div>
          <form
            onSubmit={handleAddPromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Promo Details
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border rounded-md p-2 font-montserrat"
                  />
                </div>

                <div className="w-96">
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Enter product description"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Syarat dan Ketentuan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={syarat}
                    onChange={(e) => setSyarat(e.target.value)}
                    placeholder="Enter terms and conditions"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-primary text-white font-SFPro mt-4 px-10 rounded-xl">
              Tambah
            </button>
          </form>
        </div>
      </ConfirmPopup>
      <ConfirmPopup open={editing} onClose={() => setEditing(false)}>
        <div className="w-fit flex space-x-4">
          <div className="w-full lg:w-fit p-5 border rounded-md shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Promo Image
            </h3>
            <div className="flex flex-col space-y-4">
              {selectedPromo ? (
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
            onSubmit={updatePromo}
            className="flex flex-col w-full lg:w-3/4 items-center justify-center p-2 rounded-3xl">
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full p-5 border rounded-md shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-4 font-montserrat">
                Promo Details
              </h3>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                    className="border rounded-md p-2 font-montserrat"
                  />
                </div>

                <div className="w-96">
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Promo Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={editDeskripsi}
                    onChange={(e) => setEditDeskripsi(e.target.value)}
                    placeholder="Enter product description"
                    rows="7"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-montserrat mb-1">
                    Syarat dan Ketentuan
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md font-montserrat"
                    value={editSyarat}
                    onChange={(e) => setEditSyarat(e.target.value)}
                    placeholder="Enter terms and conditions"
                    rows="4"
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
      </ConfirmPopup>
      <ConfirmPopup open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="flex flex-col space-y-4 p-8 bg-white rounded-md shadow-md">
          <h1>Anda yakin ingin menghapus promo ini?</h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setConfirmOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => (setConfirmOpen(false), deletePromo())}
              className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </ConfirmPopup>

      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">List Promo</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mt-5">
          {promo.length > 0
            ? promo.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <span className="font-SFPro font-normal text-base text-text">
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

        <div className="absolute right-0 bottom-0 p-4 z-0">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Promo
          </button>
        </div>
      </section>
    </main>
  );
}

export default ListPromo;
