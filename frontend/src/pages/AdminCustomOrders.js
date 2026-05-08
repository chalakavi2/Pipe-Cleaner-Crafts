import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AdminCustomOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => {
    axios.get("http://127.0.0.1:5000/orders/custom")
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id, status, price) => {
    axios.put(`http://127.0.0.1:5000/orders/custom/${id}`, {
      status,
      price
    }).then(() => {
      alert("Updated Successfully ✅");
      load();
    });
  };

  const statusColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Rejected") return "red";
    return "#ff9800";
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{
        marginTop: "50px",
        marginLeft: window.innerWidth > 768 ? "240px" : "20px",
        padding: "25px"
      }}>
        <h1 style={{
          color: "#4a148c",
          marginBottom: "25px"
        }}>
          🎨 Custom Craft Requests
        </h1>

        {orders.length === 0 && <p>No custom requests yet.</p>}

        {orders.map((o) => (
          <div key={o.id} style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            alignItems: "center"
          }}>

            {/* IMAGE BOX */}
            <div style={{
              width: "220px",
              height: "180px",
              background: "#fafafa",
              borderRadius: "15px",
              border: "1px solid #eee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}>
              {o.image ? (
                <img
                  src={`http://127.0.0.1:5000/uploads/${encodeURIComponent(o.image)}`}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />
              ) : (
                <p>No Image</p>
              )}
            </div>

            {/* DETAILS */}
            <div style={{ flex: 1 }}>
              <h3 style={{ marginTop: 0, color: "#6a1b9a" }}>
                👤 {o.customer_name}
              </h3>

              <p><b>📝 Description:</b> {o.description}</p>
              <p><b>💸 Customer Budget:</b> Rs {o.budget}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{
                  background: statusColor(o.status),
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}>
                  {o.status}
                </span>
              </p>

              {/* FINAL PRICE INPUT */}
              <input
                placeholder="Enter Final Price"
                onChange={(e) => o.price = e.target.value}
                style={{
                  padding: "10px",
                  width: "200px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginTop: "10px"
                }}
              />

              <br /><br />

              {/* ACTION BUTTONS */}
              <button
                onClick={() => update(o.id, "Approved", o.price)}
                style={{
                  background: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginRight: "12px"
                }}
              >
                Approve Request ✅
              </button>

              <button
                onClick={() => update(o.id, "Rejected", 0)}
                style={{
                  background: "#c62828",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Reject Request ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCustomOrders;