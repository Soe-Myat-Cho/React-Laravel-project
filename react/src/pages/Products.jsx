import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
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
    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-full">
      <div className="mb-20 pt-10 px-20">
        <form action="" method="get" className="flex items-center mb-6">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-black text-white">
            Search
          </button>
        </form>
      </div>

      <div className="product-container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
        {products.map((product) => (
          <div key={product.id} className="py-8">
            <Link to={`/products/${product.id}`}>
              <img
                src="https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211970691001_alternate10?$plpDeskRF$"
                className="aspect-square w-full h-full object-cover xl:aspect-7/8 transform hover:opacity-90 transition duration-300 ease-in-out"
              />
              <div className="items-baseline flex space-x-3">
                <p className="mt-4 text-lg text-gray-700">{product.name}</p>
                {product.discount_percentage > 0 && (
                  <p className="mt-1 text-md text-gray-600">
                    {product.discount_percentage}% Off
                  </p>
                )}
              </div>
              <div className="flex space-x-3 items-baseline">
                {product.discount_percentage > 0 ? (
                  <p className="mt-1 text-xl text-gray-900">
                    $
                    {(
                      product.price -
                      product.price * (product.discount_percentage / 100)
                    ).toFixed(1)}
                  </p>
                ) : (
                  <p className="mt-1 text-xl text-gray-900">${product.price}</p>
                )}

                {product.discount_percentage > 0 && (
                  <p className="mt-1 text-md text-gray-600 line-through">
                    ${product.price}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
