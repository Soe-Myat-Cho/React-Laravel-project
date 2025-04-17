const NavBar = () => {
  return (
    <div className="flex h-full">
      <nav className="w-64 bg-gray-800 text-white p-5 h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <a
              href="/admin/dashboard"
              className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
            >
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/order_list"
              className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
            >
              Orders
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/inventory"
              className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
            >
              Inventory
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/customers"
              className="block p-2 rounded hover:bg-gray-300 hover:text-gray-800"
            >
              Customers
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </div>
    </div>
  );
};

export default NavBar;
