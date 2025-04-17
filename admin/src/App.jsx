import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Order";
import Inventory from "./pages/Inventory";
import CustomerList from "./pages/CustomerList";
import CreateProduct from "./pages/CreateProduct";
import CreateCategory from "./pages/CreateCategory";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <nav className="w-64 bg-gray-800 text-white p-5 h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <ul>
            <li className="mb-4">
              <Link
                to="/"
                className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/order_list"
                className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
              >
                Orders
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/inventory"
                className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
              >
                Inventory
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/customer_list"
                className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
              >
                Customer List
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order_list" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customer_list" element={<CustomerList />} />
          <Route path="/products" element={<CreateProduct />} />
          <Route path="/categories" element={<CreateCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
