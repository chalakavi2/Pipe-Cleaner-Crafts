import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f3e5f5";
    localStorage.setItem("admin-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* TOP BAR */}
      <div style={{
        height: "60px",
        width: "100%",
        background: darkMode ? "#1e1e1e" : "#6a1b9a",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 0px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              fontSize: "22px",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            ☰
          </button>

          <h3 style={{ margin: 0 }}>👑 Admin Panel</h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "white",
            color: "#6a1b9a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
          }}>
            👤
          </div>
          <span>Admin</span>
        </div>
      </div>

      {/* OVERLAY (mobile only) */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 998
          }}
        />
      )}

      {/* SIDEBAR (FIXED ALWAYS VISIBLE ON DESKTOP) */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: darkMode ? "#1e1e1e" : "#4a148c",
          color: "white",
          position: "fixed",
          top: "60px",
          left: 0,                // ✅ ALWAYS visible
          zIndex: 999,
          padding: "20px",
          overflowY: "auto"
        }}
      >
        <NavItem to="/admin-dashboard" label="Dashboard" active={isActive("/admin-dashboard")} />
        <NavItem to="/admin-products" label="Products" active={isActive("/admin-products")} />
        <NavItem to="/admin-orders" label="Orders" active={isActive("/admin-orders")} />
        <NavItem to="/admin-custom" label="Custom Orders" active={isActive("/admin-custom")} />

        <button onClick={() => setDarkMode(!darkMode)} style={btnStyle}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button onClick={logout} style={{ ...btnStyle, background: "red" }}>
          Logout 🔐
        </button>
      </div>
    </>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        textDecoration: "none",
        background: active ? "white" : "transparent",
        color: active ? "#4a148c" : "white",
        fontWeight: "bold"
      }}
    >
      {label}
    </Link>
  );
}

const btnStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminNavbar;