import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ cart }) {

  const location = useLocation();

  // ❌ login/register pages walata navbar hide
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8f5ff"
    }}>

      {/* NAVBAR */}
      {!hideNavbar && <Navbar cart={cart} />}

      {/* PAGE CONTENT */}
      <div>
        <Outlet />
      </div>

    </div>
  );
}

export default MainLayout;