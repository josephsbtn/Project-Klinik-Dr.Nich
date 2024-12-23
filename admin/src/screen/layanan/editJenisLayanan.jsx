import React from "react";
import Navbar from "../../assets/component/navbar";
import { useState } from "react";

function EditJenisLayanan({ item }) {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <section className="container">
      <Navbar />
      <main className="w-[90%] pt-24 h-screen">
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
      </main>
    </section>
  );
}

export default EditJenisLayanan;
