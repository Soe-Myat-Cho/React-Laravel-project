import { useEffect, useState, useContext } from "react";
import { Link, useParams, } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { token, setToken, user, setUser } = useContext(AuthContext);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getproduct = async () => {
    const res = await fetch(`/api/products/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    setProduct(data);
  };

  const addToCart = async () => {
    try {
      if (!token) {
        alert("Please login to add to cart");
        return;
      }

      if (!selectedVariant) {  // Check if a variant is selected
        alert("Please select a size");
        return;
      }

      if (quantity > selectedVariant.stock) {
        alert("Not enough stock available");
        return;
      }

      const res = await fetch(`/api/cart/${selectedVariant.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }
      alert("Added to Cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart 2nd");
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <section className="mx-auto mt-20 bg-amber-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-white border-gray-400 border">
        <div>
          <img
            src={`/${product?.image2}`}
            alt="Product Image"
            className="object-fit w-full border-gray-400 border-r"
          />
        </div>

        <div className="pl-4 py-6 space-y-5">
          <div className="flex space-x-5 items-baseline">
            <h3 className="text-3xl font-thick">{product?.name}</h3>
            {product?.discount_percentage && (
              <p className="mt-1 text-xl text-gray-800">
                {product?.discount_percentage}% Off
              </p>
            )}
          </div>

          <div className="flex space-x-3 items-baseline">
            {product?.discount_percentage > 0 ? (
              <p className="mt-1 text-2xl  text-gray-900">

                {(
                  product.price -
                  product.price * (product.discount_percentage / 100)
                ).toFixed(1)} Ks
              </p>
            ) : (
              <p className="mt-1 text-2xl  text-gray-900">${product?.price}</p>
            )}
            {product?.discount_percentage > 0 && (
              <p className="mt-1 text-xl text-gray-600 line-through">
                {product?.price} Ks
              </p>
            )}
          </div>

          <p className="text-gray-500 mt-2">{product?.description}</p>

          {/* Size */}
          <div className="mt-4">
            <h4 className="font-semibold">Size</h4>
            <div className="flex space-x-3 mt-2">
              {product?.product_variants?.map((variant) => (
                <button
                  key={variant.id}
                  disabled={variant.stock === 0}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                  className={`px-4 py-2 border
                   ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}
                   ${selectedVariant?.id === variant.id ? "bg-black text-white" : ""}
                  `}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {selectedVariant && (
            <p className="text-sm text-gray-500 mt-2">
              Stock available: {selectedVariant.stock}
            </p>
          )}

          {/* Quantity */}
          <div className="mt-4">
            <h4 className="font-semibold">Quantity</h4>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 border"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="mt-6 bg-gray-900 text-white px-6 py-2 hover:bg-gray-800"
          >
            {/* <Link to="/cart">Add to Cart</Link> */}
            Add to Cart
          </button>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>High-quality materials</li>
              <li>Minimalist design</li>
              <li>Eco-friendly production</li>
            </ul>
          </div>
        </div>

        <div>
          <img
            src={`/${product?.image3}`}
            alt="Product Image"
            className="object-fit w-full border-gray-400 border-r"
          />
        </div>
        <div>
          <img
            src={`/${product?.image4}`}
            alt="Product Image"
            className="object-fit w-full border-gray-400 border-r"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
