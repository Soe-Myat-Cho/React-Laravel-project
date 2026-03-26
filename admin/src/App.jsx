import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Inventory from "./pages/Inventory";
import CreateProduct from "./pages/CreateProduct";
import AddProduct from "./pages/AddProduct";
import CreateCategory from "./pages/CreateCategory";


function App() {
  return (
    <BrowserRouter>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-sm text-gray-500">
              View and manage customer orders
            </p>
          </div>
          {/* <Link
            to="/order_list"
            className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
          >
            Orders
          </Link> */}
          <div>
            <Link
              to="/inventory"
              className="text-2xl font-bold text-gray-800"
            >
              Inventory
            </Link>
            <p className="text-sm text-gray-500">
              View and manage inventory
            </p>
          </div>

          <div>
            <Link
              to="/products"
              className="text-2xl font-bold text-gray-800"
            >
              Add Prodct
            </Link>
            <p className="text-sm text-gray-500">
              Add new products
            </p>
          </div>

          {/* <div className="text-sm text-gray-500">
            Admin Panel
          </div> */}

        </div>
      </header>


      {/* Page Content */}
      <div className="p-6">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<AddProduct />} />
          <Route path="/categories" element={<CreateCategory />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;