/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../../../assets/component/navbar";
import ConfirmPopup from "../../../assets/component/confirmPopUp.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ onEdit, onDelete, deleting }) => (
  <div className="flex gap-2">
    <button
      onClick={onEdit}
      className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md"
      aria-label="Edit Item">
      Edit
    </button>
    <button
      onClick={onDelete}
      className={`bg-red-500 text-sm text-white px-4 py-2 rounded-md ${
        deleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={deleting}
      aria-label="Delete Item">
      {deleting ? "Deleting..." : "Delete"}
    </button>
  </div>
);

function ListProduct() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [imageCarousel, setImageCarousel] = useState([]);
  const [categoryProduct, setCategoryProduct] = useState([]);

  const [selectedContent, setSelectedContent] = useState(null);
  const [isDeletingCarousel, setIsDeletingCarousel] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [image, setImage] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const [productsResponse, imagesResponse, categoryResponse] =
        await Promise.all([
          axios.get("/api/produk/getAllproduk"),
          axios.get("/api/produk/getImage"),
          axios.get("/api/produk/getAllkategoriProduk"),
        ]);

      const products = productsResponse.data;
      const images = imagesResponse.data;
      const categories = categoryResponse.data;

      if (Array.isArray(products)) {
        const sortedProducts = products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProduk(sortedProducts);
      }

      if (Array.isArray(images)) {
        const sortedImages = images.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setImageCarousel(sortedImages);
      }

      if (Array.isArray(categories)) {
        const sortedCategories = categories.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCategoryProduct(sortedCategories);
      }

      setError("");
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      if (isDeletingCarousel) {
        await axios.delete(`/api/produk/deleteImage/${selectedContent._id}`);
        setImageCarousel((prev) =>
          prev.filter((item) => item._id !== selectedContent._id)
        );
      } else if (isDeletingCategory) {
        await axios.delete(
          `/api/produk/deletekategoriProduk/${selectedContent._id}`
        );
        setCategoryProduct((prev) =>
          prev.filter((item) => item._id !== selectedContent._id)
        );
      } else {
        await axios.delete(`/api/produk/deleteproduk/${selectedContent._id}`);
        setProduk((prev) =>
          prev.filter((item) => item._id !== selectedContent._id)
        );
      }
      setConfirmOpen(false);
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error.message);
      alert("Failed to delete item. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/produk/newkategoriProduk", {
        name: newCategoryName,
      });
      setCategoryProduct((prev) => [...prev, response.data]);
      setAddCategoryOpen(false);
      alert("Category added successfully.");
    } catch (error) {
      console.error("Error adding category:", error.message);
      alert("Failed to add category. Please try again.");
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/produk/addImage");

      setImageCarousel((prev) => [...prev, response.data]);
      setAddImageOpen(false);
      alert("Image added to carousel successfully.");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category, e) => {
    e.preventDefault();
    navigate(`/editKategoriProduk/${category._id}`);
  };

  const handleDeleteCategory = (category, e) => {
    e.preventDefault();
    setSelectedContent(category);
    setIsDeletingCategory(true);
    setConfirmOpen(true);
  };

  const handleEdit = (item, e) => {
    e.preventDefault();
    navigate(`/editproduk/${item._id}`);
  };

  const handleDeleteProduct = (item, e) => {
    e.preventDefault();
    setSelectedContent(item);
    setIsDeletingCategory(false);
    setIsDeletingCarousel(false);
    setConfirmOpen(true);
  };

  const handleDeleteImage = (item, e) => {
    e.preventDefault();
    setSelectedContent(item);
    setIsDeletingCarousel(true);
    setIsDeletingCategory(false);
    setConfirmOpen(true);
  };

  const handleAddCategory = () => {
    setAddCategoryOpen(true);
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
    <main className="flex flex-col container">
      <Navbar selected={"/produk"} />
      <ConfirmPopup open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="flex flex-col space-y-4 p-8 bg-white rounded-md shadow-md">
          <h1>Are you sure you want to delete this item?</h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setConfirmOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`bg-red-500 text-white px-4 py-2 rounded-md ${
                deleting ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </ConfirmPopup>
      <ConfirmPopup
        open={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}>
        <form
          className="flex flex-col space-y-4 p-2 w-96 items-center"
          onSubmit={addCategory}>
          <h3 className="text-xl font-semibold mb-4">Add Category</h3>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Category Name"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
      </ConfirmPopup>
      <ConfirmPopup open={addImageOpen} onClose={() => setAddImageOpen(false)}>
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
      </ConfirmPopup>
      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">List Categories</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mt-5">
          {categoryProduct.length > 0
            ? categoryProduct.map((category) => (
                <div
                  key={category._id}
                  className="flex justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <span className="font-SFPro font-normal text-base text-text line-clamp-1">
                    {category.name}
                  </span>
                  <ActionButtons
                    onEdit={(e) => handleEditCategory(category, e)}
                    onDelete={(e) => handleDeleteCategory(category, e)}
                    deleting={deleting}
                  />
                </div>
              ))
            : !error && (
                <div className="text-gray-500 mt-8">
                  No categories available
                </div>
              )}
        </div>
      </section>

      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">Carousel Image</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mt-5">
          {imageCarousel.length > 0 ? (
            imageCarousel.map((item) => (
              <div
                key={item._id}
                className="flex flex-col justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt="Carousel"
                />
                <ActionButtons
                  onEdit={() => {}}
                  onDelete={(e) => handleDeleteImage(item, e)}
                  deleting={deleting}
                />
              </div>
            ))
          ) : (
            <div className="text-gray-500 mt-8">
              No carousel images available
            </div>
          )}
        </div>
      </section>

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
                  <ActionButtons
                    onEdit={(e) => handleEdit(item, e)}
                    onDelete={(e) => handleDeleteProduct(item, e)}
                    deleting={deleting}
                  />
                </div>
              ))
            : !error && (
                <div className="text-gray-500 mt-8">No products available</div>
              )}
        </div>

        <div className="fixed right-0 bottom-0 p-4 z-0 flex justify-center items-center space-x-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/tambahproduk")}>
            Add Product
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleAddCategory}>
            Add Category
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => setAddImageOpen(true)}>
            Add Carousel Image
          </button>
        </div>
      </section>
    </main>
  );
}

export default ListProduct;
