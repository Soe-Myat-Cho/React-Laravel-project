import { useContext, useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const NavBar = () => {
  const { user, setToken, setUser, token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories", {
      method: "GET",
    });

    const data = await res.json();
    setCategories(data);
    console.log(data);
  };

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      alert("Logged Out Successfully");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav
      id="navbar"
      className="flex opacity-95 bg-white border-b px-6 py-6 justify-between items-center fixed top-0 w-full transform transition duration-300 ease-in-out z-50"
    >
      <h1 className="text-3xl">
        <a href="/">Elegance</a>
      </h1>

      <ul className="hidden md:flex gap-6">
        <li>
          <Link to="/" className="cursor-pointer">
            Home
          </Link>
        </li>

        <li>
          <Link to="/products" className="cursor-pointer">
            Shop all
          </Link>
        </li>

        {categories.map((category) => (
          <li>
            <Link to={`/products/category/${category.id}`} className="cursor-pointer">
              {category.name}
            </Link>
          </li>
        ))}

      </ul>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative hover:text-gray-500">
          🛒
        </Link>

        <ul className="flex gap-6">
          {user ? (
            <div className="flex gap-6">
              <li>{user.name}</li>
              <li>
                <form onSubmit={handleLogout}>
                  <button className="cursor-pointer hover:text-gray-500 ">
                    Logout
                  </button>
                </form>
              </li>
            </div>
          ) : (
            <div className="flex gap-6">
              <li>
                <Link to="/register" className="cursor-pointer">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="cursor-pointer">
                  Login
                </Link>
              </li>
            </div>
          )}
        </ul>

        <button id="hamburger" className="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
