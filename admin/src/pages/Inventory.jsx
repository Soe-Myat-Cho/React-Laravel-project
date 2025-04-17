import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products", {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
    console.log(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories", {
      method: "GET",
    });

    const data = await res.json();
    setCategories(data);
    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between my-4">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <Link
          to="/products"
          className="text-gray-900 px-3 py-1 hover:underline"
        >
          Create a New Product
        </Link>
        <Link
          to="/categories"
          className="text-gray-900 px-3 py-1 hover:underline"
        >
          Create a New Category
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-sm overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Product ID</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Discount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{product.id}</td>
                <td className="py-3 px-4 ">{product.name}</td>
                <td className="py-3 px-4 ">${product.price}</td>
                <td className="py-3 px-4 text-center ">{product.quantity}</td>
                <td className="py-3 px-4 text-center">
                  {product.discount_percentage}%
                </td>
                <td className="py-3 px-4">{product.category.name}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-900 px-3 py-1 rounded hover:underline"
                    >
                      Edit
                    </a>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
