import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Cart = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");

  const getCartItems = async () => {
    const res = await fetch("/api/cart-items", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCartItems(data);
  };

  const removeFromCart = async (id) => {
    const res = await fetch(`/api/cart-items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      alert("Removed from cart");
      getCartItems();
    } else {
      alert("Failed to remove from cart");
    }
  };



  const calculateTotalPrice = () => {
    let total = 0;

    cartItems.forEach((cartItem) => {
      const product = cartItem.product_variant.product;

      const price =
        product.price -
        product.price * (product.discount_percentage / 100);

      total += price * cartItem.quantity;
    });

    setTotalPrice(total.toFixed(1));
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipping_address: shippingAddress,
        total_price: totalPrice,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Order successful");
      getCartItems();
    } else {
      alert("Order failed");
      console.error("Error:", data); // helpful for debugging
    }
  };



  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-20 p-6">
        <h2 className="text-2xl font-semibold mb-4 py-5">Shopping Cart</h2>
        <p className="text-gray-500 h-screen ">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6">
      <h2 className="text-2xl font-semibold mb-4 py-5">Shopping Cart</h2>

      <div className="space-y-4 pb-4">
        <div>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex space-x-5 border-gray-400 border-b pb-4 mt-10"
            >
              <img
                src="https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211970691001_alternate4?$rl_4x5_zoom$"
                alt="Product Image"
                className="object-cover w-1/5"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl">{cartItem.product_variant.product.name}</h3>

                  <p className="text-gray-500">Size: {cartItem.product_variant.size}</p>

                  {(() => {
                    const product = cartItem.product_variant.product;

                    const discountedPrice =
                      product.price -
                      product.price * (product.discount_percentage / 100);

                    return (
                      <>
                        {product.discount_percentage > 0 && (
                          <p className="text-gray-500 line-through">
                            ${product.price}
                          </p>
                        )}

                        <p className="text-lg font-medium text-gray-900">
                          ${discountedPrice.toFixed(1)}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <p className="text-gray-800 w-3/5">
                  {cartItem.product_variant.product.description}
                </p>
                <p className="text-gray-700">
                  Quantity: {cartItem.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(cartItem.id)}
                className="text-gray-900 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-semibold">Total : ${totalPrice}</h3>
        <div className="mt-4">
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            id="orderNotes"
            name="shipping_address"
            className="w-full p-2 border"
            rows="8"
            placeholder="Enter your shipping address"
          ></textarea>
        </div>
        <button
          onClick={() => handleCheckout()}
          className="mt-4 bg-gray-900 text-white px-6 py-2 hover:bg-gray-700 cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
