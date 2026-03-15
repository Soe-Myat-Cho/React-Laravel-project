import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    const fetchOrders = async () => {

        let query = [];

        if (status) query.push(`status=${status}`);
        if (date) query.push(`date=${date}`);

        const queryString = query.length ? `?${query.join("&")}` : "";

        const res = await fetch(`/api/orders${queryString}`);
        const data = await res.json();

        setOrders(data);
    };



    useEffect(() => {
        fetchOrders();
    }, [status, date]);

    const statusStyle = (status) => {
        if (status === "pending")
            return "bg-yellow-100 text-yellow-700";
        if (status === "processing")
            return "bg-blue-100 text-blue-700";
        if (status === "completed")
            return "bg-green-100 text-green-700";

        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="p-6">

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div className="flex gap-4 mb-4">

                {/* Status Filter */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                </select>

                {/* Date Filter */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded px-3 py-2"
                />

                {/* Reset Button */}
                <button
                    onClick={() => {
                        setStatus("");
                        setDate("");
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Reset
                </button>

            </div>

            {/* Table Container */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                            <tr>
                                <th className="p-4">Order ID</th>
                                {/* <th className="p-4">Receiver</th>
                                <th className="p-4">Phone</th> */}
                                <th className="p-4">Total</th>
                                {/* <th className="p-4">Payment</th> */}
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-4 font-medium">{order.id}</td>

                                    {/* <td className="p-4">
                                        {order.receiver_name}
                                    </td>

                                    <td className="p-4">
                                        {order.phone_number}
                                    </td> */}

                                    <td className="p-4 font-semibold">
                                        ${order.total_price}
                                    </td>

                                    {/* <td className="p-4 uppercase">
                                        {order.payment_method}
                                    </td> */}



                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        {new Date(order.created_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>

                                    <td className="p-4 text-center">
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center p-6 text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;