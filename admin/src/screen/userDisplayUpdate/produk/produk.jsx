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
        deleting ? "cursor-not-allowed" : ""
      }`}
      disabled={deleting}
      aria-label="Delete Item">
      {deleting ? "Delete" : "Delete"}
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
  const [editCategoryName, setEditCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [editImageOpen, setEditImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const [productsResponse, imagesResponse, categoryResponse] =
        await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAllproduk`
          ),
          axios.get(
            `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getImage`
          ),
          axios.get(
            `${
              import.meta.env.VITE_BASE_URL_BACKEND
            }/api/produk/getAllkategoriProduk`
          ),
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
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/deleteImage/${
            selectedContent._id
          }`
        );
        setImageCarousel((prev) =>
          prev.filter((item) => item._id !== selectedContent._id)
        );
      } else if (isDeletingCategory) {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/deletekategoriProduk/${selectedContent._id}`
        );
        setCategoryProduct((prev) =>
          prev.filter((item) => item._id !== selectedContent._id)
        );
      } else {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/deleteproduk/${
            selectedContent._id
          }`
        );
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
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/tambahkategoriProduk`,
        {
          name: newCategoryName,
          image: categoryImage,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );

      setCategoryProduct((prev) => [...prev, response.data]);

      setAddCategoryOpen(false);
      alert("Category added successfully.");

      //Optionally reset form fields
      setNewCategoryName("");
      setCategoryImage(null);
    } catch (error) {
      // Capture more detailed error if available
      if (error.response && error.response.data) {
        console.error("Error adding category:", error.response.data);
        alert(
          `Failed to add category: ${
            error.response.data.message || "Please try again."
          }`
        );
      } else {
        console.error("Error adding category:", error.message);
        alert("Failed to add category. Please try again.");
      }
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("data", image);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/newImage`,
        image
      );

      console.log(response.data);
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
    setSelectedContent(category);
    setEditCategoryName(category.name);
    setEditCategoryOpen(true);
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

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/editkategoriProduk/${selectedContent._id}`,
        {
          name: editCategoryName,
          image: categoryImage,
        }
      );
      setCategoryProduct((prev) =>
        prev.map((item) =>
          item._id === selectedContent._id
            ? { ...item, name: editCategoryName, image: categoryImage }
            : item
        )
      );
      setEditCategoryOpen(false);
      alert("Category updated successfully.");
    } catch (error) {
      console.error("Error updating category:", error.message);
      alert("Failed to update category. Please try again.");
    }
  };

  const convertBase64 = (e, setImageFunction) => {
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
      setImageFunction(reader.result);
    };
  };

  const handleEditImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", newImage);
      await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/editImage/${
          selectedImage._id
        }`,
        formData
      );
      setImageCarousel((prev) =>
        prev.map((item) =>
          item._id === selectedImage._id ? { ...item, image: newImage } : item
        )
      );
      setEditImageOpen(false);
      alert("Image updated successfully.");
    } catch (error) {
      console.error("Error updating image:", error.message);
      alert("Failed to update image. Please try again.");
    }
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
          <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
            Add Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => convertBase64(e, setCategoryImage)}
            />
          </label>
          {categoryImage && (
            <img
              src={categoryImage}
              alt="Category Preview"
              className="w-auto h-40 aspect-video object-cover rounded-md border"
            />
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
      </ConfirmPopup>
      <ConfirmPopup
        open={editCategoryOpen}
        onClose={() => setEditCategoryOpen(false)}>
        <form
          className="flex flex-col space-y-4 p-2 w-96 items-center"
          onSubmit={handleEditCategorySubmit}>
          <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Category Name"
            required
          />
          <label className="px-4 py-2 font-montserrat bg-blue-600 text-white rounded-md cursor-pointer">
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => convertBase64(e, setCategoryImage)}
            />
          </label>
          {categoryImage && (
            <img
              src={categoryImage}
              alt="Category Preview"
              className="w-auto h-40 aspect-video object-cover rounded-md border"
            />
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            disabled={loading}>
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </ConfirmPopup>
      <ConfirmPopup open={addImageOpen} onClose={() => setAddImageOpen(false)}>
        <div className="w-full h-[90%] lg:w-full p-5 border rounded-md shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4 font-montserrat">
            Product Carousel Image
          </h3>
          <form className="flex flex-col space-y-4" onSubmit={handleAddImage}>
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
                  onChange={(e) => convertBase64(e, setImage)}
                />
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 font-montserrat text-white rounded-md">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </ConfirmPopup>

      {/* Categories Section */}
      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">List Categories</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl mt-5">
          {categoryProduct.length > 0
            ? categoryProduct.map((category) => (
                <div
                  key={category._id}
                  className="flex justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <div className="flex items-center gap-4">
                    {category.image && (
                      <img
                        src={category.image}
                        alt="Category"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <span className="font-SFPro font-normal text-base text-text line-clamp-1">
                      {category.name}
                    </span>
                  </div>
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

      {/* Carousel section */}
      <section className="w-full pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-xl font-bold text-secondary">Carousel Image</h1>
        {error && <div className="text-red-500 my-4">{error}</div>}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl mt-5">
          {imageCarousel.length > 0
            ? imageCarousel.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col justify-between h-fit p-4 items-center border border-disable-line rounded-lg shadow-md">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover mb-2"
                    alt="Carousel"
                  />
                  <ActionButtons
                    onEdit={() => {
                      setSelectedImage(item);
                      setEditImageOpen(true);
                    }}
                    onDelete={(e) => handleDeleteImage(item, e)}
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

      {/* Product section */}

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
            className="bg-primary text-white w-48 py-2 rounded-md"
            onClick={() => navigate("/tambahproduk")}>
            Add Product
          </button>
          <button
            className="bg-primary text-white w-48 py-2 rounded-md"
            onClick={handleAddCategory}>
            Add Category
          </button>
          <button
            className="bg-primary text-white w-48 py-2 rounded-md"
            onClick={() => setAddImageOpen(true)}>
            Add Product Type
          </button>
          <button
            className="bg-primary text-white w-48 py-2 rounded-md"
            onClick={() => setAddImageOpen(true)}>
            Add Carousel Image
          </button>
        </div>
      </section>
      {editImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Carousel Image</h2>
            <form onSubmit={handleEditImage}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditImageOpen(false)}
                  className="mr-4 p-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default ListProduct;
