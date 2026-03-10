import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Cart = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [errors, setErrors] = useState({});

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

  const updateQuantity = async (id, quantity) => {

    const res = await fetch(`/api/cart-items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await res.json();

    if (res.ok) {
      getCartItems(); // refresh cart
    } else {
      alert(data.error);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!receiverName.trim()) {
      newErrors.receiverName = "Receiver name is required";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{8,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {

    if (!validateForm()) {
      return;
    }

    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipping_address: shippingAddress,
        total_price: totalPrice,
        receiver_name: receiverName,
        phone_number: phoneNumber,
        delivery_notes: deliveryNotes,
        payment_method: "cod"
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
                src={`/${cartItem.product_variant.product?.image1}`}
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
                            {product.price} Ks
                          </p>
                        )}

                        <p className="text-lg font-medium text-gray-900">
                          {discountedPrice.toFixed(1)} Ks
                        </p>
                      </>
                    );
                  })()}
                </div>
                <p className="text-gray-800 w-3/5">
                  {cartItem.product_variant.product.description}
                </p>
                <div className="flex items-center gap-2">

                  <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}>
                    -
                  </button>

                  <span>{cartItem.quantity}</span>

                  <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}>
                    +
                  </button>

                </div>
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
        <h3 className="text-xl font-semibold">Total : {totalPrice} Ks</h3>
        <div className="mt-8 bg-white border rounded-lg p-6 shadow-sm text-left">

          <h3 className="text-lg font-semibold mb-6">Delivery Information</h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Receiver Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Receiver Name
              </label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.receiverName ? "border-red-500 focus:ring-red-400" : "focus:ring-black"
                  }`}
                placeholder="John Smith"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm mt-1">{errors.receiverName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.phoneNumber ? "border-red-500 focus:ring-red-400" : "focus:ring-black"
                  }`}
                placeholder="0812345678"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Shipping Address
            </label>

            <textarea
              rows="4"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.shippingAddress ? "border-red-500 focus:ring-red-400" : "focus:ring-black"
                }`}
              placeholder="House number, street, city, province, postal code"
            />

            {errors.shippingAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>
            )}
          </div>

          {/* Delivery Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Delivery Notes (Optional)
            </label>

            <textarea
              rows="3"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Leave at door / call before delivery"
            />
          </div>

          <div className="mt-6 border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-1">
              Payment Method: Cash on Delivery (COD)
            </h4>

            <p className="text-sm text-yellow-700 leading-relaxed">
              We currently accept <span className="font-medium">Cash on Delivery (COD)</span> only.
              Please prepare the exact payment when your order arrives.
              Our delivery staff will collect the payment upon delivery.
            </p>

            <p className="text-sm text-yellow-700 mt-2">
              Orders will be processed after confirmation and delivered to the address you provided.
            </p>
          </div>

        </div>

        <button
          onClick={() => handleCheckout()}
          className="mt-4 bg-gray-900 text-white px-6 py-2 hover:bg-gray-700 cursor-pointer"
        >
          Checkout
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Payment method: Cash on Delivery (COD)
        </p>
      </div>
    </div>
  );
};

export default Cart;
