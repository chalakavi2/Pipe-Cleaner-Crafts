import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <AdminNavbar isMobile={isMobile} />

      {/* CONTENT */}
      <div
        style={{
          marginLeft: isMobile ? "0" : "70px",
          marginTop: isMobile ? "70px" : "0",
          width: "100%",
          padding: "20px",
          background: "#f3e5f5",
          minHeight: "100vh",
          transition: "all 0.3s ease"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;