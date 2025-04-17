import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./pages/components/Footer";
import NavBar from "./pages/components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AuthContextProvider from "./Context/AuthContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
