import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);

  const user = localStorage.getItem("user");

  const loadOrders = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/orders/history/${encodeURIComponent(user)}`
      );

      const newOrders = res.data || [];

      if (orders.length > 0) {
        const latest = newOrders[0];
        const oldLatest = orders[0];

        if (latest && oldLatest && latest.status !== oldLatest.status) {
          if (latest.status === "Approved") {
            setPopup("🎉 Your custom order has been approved!");
          } else if (latest.status === "Rejected") {
            setPopup("❌ Your custom order was rejected");
          }
        }
      }

      setOrders(newOrders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const cancelOrder = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/orders/cancel/${id}`);
      alert("Order cancelled");
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "#ff9800";
    if (status === "Approved") return "#1976d2";
    if (status === "Delivered") return "#2e7d32";
    if (status === "Cancelled") return "#d32f2f";
    if (status === "Rejected") return "#c62828";
    return "#999";
  };

  return (
    <div>

      {/* POPUP */}
      {popup && (
        <div style={styles.popup}>
          {popup}
          <button onClick={() => setPopup(null)} style={styles.popupBtn}>
            OK
          </button>
        </div>
      )}

      <div style={styles.page}>
        <h1 style={styles.title}>📜 My Orders</h1>

        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        ) : orders.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No orders found</h3>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              style={{
                ...styles.card,
                borderLeft: o.custom_id
                  ? "6px solid #8e24aa"
                  : "6px solid #ccc",
              }}
            >
              <div style={styles.imgBox}>
                <img
                  src={
                    o.image
                      ? `http://127.0.0.1:5000/uploads/${o.image}`
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  style={styles.img}
                  alt=""
                />
              </div>

              <div style={styles.content}>
                <h3>{o.product_name}</h3>

                {o.custom_id && <span style={styles.customTag}>🎨 Custom Order</span>}

                <p>Qty: {o.qty}</p>
                <p>Price: Rs {o.price}</p>
                <p>Address: {o.address}</p>

                <span
                  style={{
                    ...styles.status,
                    background: getStatusColor(o.status),
                  }}
                >
                  {o.status}
                </span>

                {o.status === "Approved" && o.custom_id && (
                  <p style={styles.successMsg}>🎉 Your custom order is approved!</p>
                )}

                {o.status === "Rejected" && o.custom_id && (
                  <p style={styles.rejectMsg}>❌ Your custom request was rejected</p>
                )}

                {o.status === "Delivered" && (
                  <p style={styles.delivered}>✅ Delivered successfully</p>
                )}

                {o.status === "Pending" && (
                  <button
                    onClick={() => cancelOrder(o.id)}
                    style={styles.cancelBtn}
                  >
                    Cancel Order ❌
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    left: "20px",
    maxWidth: "320px",
    margin: "auto",
    background: "#6a1b9a",
    color: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 9999,
    textAlign: "center"
  },

  popupBtn: {
    marginTop: "10px",
    background: "white",
    color: "#6a1b9a",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  page: {
    padding: "20px",
    background: "#f6f0ff",
    minHeight: "100vh",
  },

  title: {
    color: "#6a1b9a",
    textAlign: "center",
    marginBottom: "25px"
  },

  card: {
    display: "flex",
    gap: "18px",
    background: "white",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    flexWrap: "wrap"
  },

  imgBox: {
    width: "120px",
    height: "120px",
    flexShrink: 0,
    background: "#fafafa",
    borderRadius: "12px",
    overflow: "hidden",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  background: "#fff",
  },

  content: {
    flex: 1,
    minWidth: "180px"
  },

  status: {
    display: "inline-block",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    marginTop: "5px",
  },

  cancelBtn: {
    marginTop: "12px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "20px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "180px"
  },

  customTag: {
    display: "inline-block",
    background: "#ede7f6",
    color: "#6a1b9a",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginBottom: "8px",
  },

  successMsg: {
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "8px",
    borderRadius: "8px",
    marginTop: "10px",
  },

  rejectMsg: {
    background: "#ffebee",
    color: "#c62828",
    padding: "8px",
    borderRadius: "8px",
    marginTop: "10px",
  },

  delivered: {
    color: "#2e7d32",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default MyOrders;