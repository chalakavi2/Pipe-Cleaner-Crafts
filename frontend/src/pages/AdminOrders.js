import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios.get("http://127.0.0.1:5000/orders/all")
      .then((res) => setOrders(res.data));
  };

  const markDelivered = (id) => {
    axios.put(`http://127.0.0.1:5000/orders/status/${id}`, {
      status: "Delivered"
    }).then(() => {
      alert("Delivered Successfully ✅");
      loadOrders();
    });
  };

  const statusColor = (status) => {
    if (status === "Delivered") return "green";
    if (status === "Cancelled") return "red";
    return "#ff9800";
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{
        marginTop: "40px",
        marginLeft: window.innerWidth > 768 ? "240px" : "20px",
        padding: "25px"
      }}>
        <h1 style={{ color: "#4a148c", marginBottom: "25px" }}>
          🧾 Orders Management
        </h1>

        {orders.map((o) => (
          <div key={o.id} style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "15px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}>

            {/* ORDER IMAGE */}
            <img
              src={
                o.image
                  ? `http://127.0.0.1:5000/uploads/${encodeURIComponent(o.image)}`
                  : "https://via.placeholder.com/150x120?text=No+Image"
              }
              alt=""
              style={{
                width: "250px",
                height: "220px",
                objectFit: "contain",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            />

            {/* ORDER DETAILS */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: "#6a1b9a" }}>{o.product_name}</h3>
              <p><b>👤 Customer:</b> {o.customer_name}</p>
              <p><b>📦 Qty:</b> {o.qty}</p>
              <p><b>💰 Price:</b> Rs {o.price}</p>
              <p><b>📍 Address:</b> {o.address}</p>
              <p><b>📞 Phone:</b> {o.phone}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{
                  background: statusColor(o.status),
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}>
                  {o.status}
                </span>
              </p>
            </div>

            {/* BUTTON */}
            <div>
              {o.status === "Pending" && (
                <button
                  onClick={() => markDelivered(o.id)}
                  style={{
                    background: "#43a047",
                    color: "white",
                    border: "none",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Deliver Now ✅
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;