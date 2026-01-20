import { useEffect, useState } from "react";
import { createProductApi, getAllProductsApi,  } from "../services/api";
import toast from "react-hot-toast";

const AdminAddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const fetchProducts = async () => {
        try {
            const { data } = await getAllProductsApi();
            setProducts(data.products);
        } catch (error) {
            toast.error("Failed to fetch products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            if (thumbnail) formData.append("thumbnail", thumbnail);
            images.forEach((img) => formData.append("images", img));

            await createProductApi(formData);
            toast.success("Product added successfully");

            setForm({ name: "", price: "", quantity: "", description: "" });
            setThumbnail(null);
            setImages([]);
            fetchProducts(); // Refresh table
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            toast.success("Product deleted successfully");
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-8">
                <input
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                />
                <textarea
                    className="w-full border border-gray-300 p-2 rounded mb-3"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <label className="block mb-3">
                    Thumbnail
                    <input
                        type="file"
                        className="mt-1"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </label>
                <label className="block mb-3">
                    Product Images
                    <input
                        type="file"
                        multiple
                        className="mt-1"
                        onChange={(e) => setImages([...e.target.files])}
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>

            {/* Product Table */}
            <h3 className="text-xl font-semibold mb-3">All Products</h3>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="py-2 px-4 border border-gray-300">#</th>
                            <th className="py-2 px-4 border border-gray-300">Thumbnail</th>
                            <th className="py-2 px-4 border border-gray-300">Name</th>
                            <th className="py-2 px-4 border border-gray-300">Price</th>
                            <th className="py-2 px-4 border border-gray-300">Qty</th>
                            <th className="py-2 px-4 border border-gray-300">Images</th>
                            <th className="py-2 px-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {product.thumbnail ? (
                                            <img
                                                src={`${API_BASE}${product.thumbnail}`}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            {product.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                     src={`${API_BASE}${product.images[index]}`}
                                                    alt={`${product.name} ${index + 1}`}
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">{product.name}</td>
                                    <td className="py-2 px-4 border border-gray-300">₹ {product.price}</td>
                                    <td className="py-2 px-4 border border-gray-300">{product.quantity}</td>
                                    <td className="py-2 px-4 border border-gray-300">{product.images?.length || 0}</td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAddProduct;
