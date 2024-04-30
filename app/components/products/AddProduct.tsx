import { useAuth } from "@/app/context/AuthContext";
import { URL } from "@/constants/constant";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    width: "90%",
    height: "100vh",
    zIndex: "100",
  },
};

const AddProduct = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { token } = useAuth();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    unit: "",
    // keyFeatures: "",
    quantity: "",
    image: null,
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(e: any) {
    const { name, value, files } = e.target;
    if (files) {
      console.log(files[0]);
      setProduct((prevData) => ({
        ...prevData,
        [name]: files[0], // Assuming only one file is uploaded
      }));
    } else {
      setProduct((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("discount", product.discount);
      formData.append("description", product.description);
      formData.append("unit", product.unit);
      formData.append("quantity", product.quantity);
      // @ts-ignore
      formData.append("image", product.image);

      const response = await axios.post(`${URL}product`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      console.log(response.data);

      if (response) {
        toast.success("Product Added");
      }
    } catch (e) {
      console.log("Error occured!!! :-)", e);
    }

    closeModal();
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Product Modal"
      >
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form className="w-full max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Category"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Price"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-gray-700 font-bold mb-2"
            >
              Discount
            </label>
            <input
              id="discount"
              type="number"
              step="0.01"
              min="0"
              max="100"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Discount (%)"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="unit"
              className="block text-gray-700 font-bold mb-2"
            >
              Unit
            </label>
            <input
              id="unit"
              type="text"
              name="unit"
              value={product.unit}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Unit"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="keyFeatures"
              className="block text-gray-700 font-bold mb-2"
            >
              Key Features
            </label>
            <textarea
              id="keyFeatures"
              rows={3}
              name="keyFeatures"
              // value={product.keyFeatures}
              // onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Key Features (each feature on a new line)"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Quantity"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddProduct;
