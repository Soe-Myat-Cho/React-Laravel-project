import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    <div>
      <div className="flex flex-col md:flex-row mt-20">
        <div className="w-full md:w-1/2">
          <img
            src="https://media1.calvinklein.com/images/20250205_misc/PLP/R296_SKO_NA_FEB_90S_LOOSE_JEAN_01_003_R4_2x.webp"
            alt=""
          />
        </div>
        <div className="bg-gray-100 w-full md:w-1/2 flex justify-center items-center text-center px-5 py-10">
          <div>
            <h3 className="text-3xl text-start font-light">
              90s Inspired Jeans
            </h3>
            <p className="text-md text-start">
              Find your iconic fit. From straight to slim, 90s and more.
            </p>
          </div>
        </div>
      </div>

      <div className="flex relative h-screen bg-[url('https://media1.calvinklein.com/images/20250318/HP/HP_BB_Lily.webp')] bg-cover bg-center mt-1">
        <div className="absolute bottom-10 left-5 text-start">
          <h2 className="font-thin text-7xl text-white">
            SPRING ENERGY <br /> AMPLIFIED
          </h2>
          <p className="text-3xl font-light text-white">
            Signature fits with modern edge. Effortless attitude through the
            seasons
          </p>
        </div>
      </div>

      <div className="bg-red">
        <div className="mx-auto max-w-2xl py-5 sm:py-20 lg:max-w-full">
          <h2 className="text-3xl tracking-tight text-gray-900 mb-3 text-center">
            Customers also purchased
          </h2>
          <div className="product-container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
            {products.slice(0, 4).map((product) => (
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
                      <p className="mt-1 text-xl text-gray-900">
                        ${product.price}
                      </p>
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
      </div>

      <section className="py-12">
        <h2 className="text-3xl mb-10 text-gray-900 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
          {categories.slice(0, 3).map((category) => (
            <div key={category.id} className="pb-4">
              <img
                src="https://i.pinimg.com/736x/85/14/0e/85140ed33cce9ece257650252c1331a8.jpg"
                alt="Shirt"
                className="transform hover:scale-105 transition duration-300 ease-in-out"
              />
              <h3 className="mt-2 text-xl font-semibold text-center pt-4">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen h-96 bg-cover bg-center flex items-center justify-center text-white text-center">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              FASHION REFLECTS WHO YOU ARE
            </h1>
            <p className="mt-8 text-lg text-gray-500 sm:text-xl">
              "Fashion is part of the daily air and it changes all the time..."
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row mt-1 space-x-1">
        <div className="w-full md:w-1/2">
          <img
            src="https://calvinklein.scene7.com/is/image/CalvinKlein/21898171_001_main?wid=1487&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://calvinklein.scene7.com/is/image/CalvinKlein/11002090_501_main?wid=1487&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
