import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function OrderDetail() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");

    const fetchOrder = async () => {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        setOrder(data);
        setStatus(data.status); // store current status
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const updateStatus = async () => {
        const res = await fetch(`/api/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        if (res.ok) {
            setOrder(data.order);
            alert("Order status updated");
        } else {
            alert("Failed to update status");
        }
    };

    if (!order) {
        return <div className="p-6">Loading...</div>;
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="p-6">

            <Link to="/" className="text-blue-600 mb-4 inline-block">
                ← Back to Orders
            </Link>

            <h1 className="text-3xl font-bold mb-6">
                Order {order.id}
            </h1>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg overflow-hidden">

                <h2 className="text-xl font-semibold p-6 border-b">
                    Order Items
                </h2>

                <table className="w-full text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Qty</th>
                            <th className="p-4">Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.order_items?.map((item) => {

                            const product = item.product_variant.product;

                            return (
                                <tr key={item.id} className="border-t">

                                    <td className="p-4 flex items-center gap-4">

                                        <img
                                            src={`http://localhost:5173/${product.image1}`}
                                            alt={product.name}
                                            className="object-cover w-1/5"
                                        />

                                        <span>{product.name}</span>

                                    </td>

                                    <td className="p-4">
                                        {item.product_variant.size}
                                    </td>

                                    <td className="p-4">
                                        ${item.price}
                                    </td>

                                    <td className="p-4">
                                        {item.quantity}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        ${item.price * item.quantity}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>

                <div className="p-6 flex justify-end border-t">
                    <div className="text-lg font-semibold">
                        Total: ${order.total_price}
                    </div>
                </div>

            </div>

            {/* Order Info */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">

                <h2 className="text-xl font-semibold mb-4">
                    Delivery Info
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <p className="text-gray-500 text-sm">Receiver Name</p>
                        <p className="font-medium">{order.receiver_name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium">{formatDate(order.created_at)}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Address</p>
                        <p className="font-medium">{order.shipping_address}</p>
                    </div>

                    {/* STATUS UPDATE UI */}
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Status</p>

                        <div className="flex gap-6">

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                            </select>

                            <button
                                onClick={updateStatus}
                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Update Status
                            </button>

                        </div>

                    </div>

                    {/* <div className="bg-white border rounded-lg p-4 shadow-sm w-fit">

                        <p className="text-gray-500 text-sm mb-2 font-medium">
                            Order Status
                        </p>

                        <div className="flex items-center gap-4">

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                            </select>

                            <button
                                onClick={updateStatus}
                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Update Status
                            </button>

                        </div>

                    </div> */}

                    <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="font-medium">{order.phone_number}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Payment</p>
                        <p className="font-medium uppercase">
                            {order.payment_method}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Delivery Notes</p>
                        <p className="font-medium">{order.delivery_notes}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderDetail;