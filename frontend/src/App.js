import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import MyOrders from "./pages/MyOrders";
import CustomOrder from "./pages/CustomOrder";
import AdminCustomOrders from "./pages/AdminCustomOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AboutUs from "./pages/AboutUs";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= CUSTOMER ================= */}
        <Route element={<MainLayout cart={cart} />}>

          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/custom" element={<CustomOrder />} />
          <Route path="/about" element={<AboutUs />} />

        </Route>

        /* ================= ADMIN LOGIN ================= */

          <Route path="/admin" element={<AdminLogin />} />


        {/* ================= ADMIN PANEL ================= */}

        <Route element={<AdminLayout />}>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/admin-products" element={<AdminProducts />} />

        <Route path="/admin-orders" element={<AdminOrders />} />

        <Route path="/admin-custom" element={<AdminCustomOrders />} />

        </Route>
</Routes>
    </BrowserRouter>
  );
}

export default App;