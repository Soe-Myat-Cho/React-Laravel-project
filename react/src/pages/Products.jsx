import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const fetchProducts = async () => {
  //   const res = await fetch("/api/products", {
  //     method: "GET",
  //   });

  //   const data = await res.json();
  //   setProducts(data);

  //   console.log(data);
  // };

  const fetchProducts = async (categoryId = null) => {
    let url = "/api/products";

    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
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
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-full">
      {/* <div className="mb-20 pt-10 px-20">
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
      </div> */}

      <div class="flex flex-col md:flex-row mb-5">
        <div class="w-full md:w-1/2">
          <img
            src="https://media1.calvinklein.com/images/20250304/Tiles/Tile_Lily_4_2x.webp"
            alt=""
          />
        </div>
        <div
          class="bg-gray-100 w-full md:w-1/2 flex justify-center items-center text-center px-5 py-10"
        >
          <div>
            <h3 class="text-3xl text-start font-semi-bold">90s Inspired Jeans</h3>
            <p class="text-md text-start">
              Find your iconic fit. From straight to slim, 90s and more.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 px-20 mt-20">
        {/* All Category */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer hover:border-black transition-all duration-400 px-4 py-2 active border rounded-full border-gray-400 md:col-span-1 ${selectedCategory === null
            ? "bg-black text-white"
            : "bg-white text-black"
            }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`cursor-pointer hover:border-black transition-all duration-400 px-4 py-2 active border rounded-full border-gray-400 md:col-span-1 ${selectedCategory === category.id
              ? "bg-gray-900 text-white"
              : "bg-white text-black"
              }`}
          >
            {category.name}
          </button>
        ))}
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
