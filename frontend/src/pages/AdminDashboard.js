import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customs, setCustoms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios.get("http://127.0.0.1:5000/products")
      .then((res) => setProducts(res.data));

    axios.get("http://127.0.0.1:5000/admin/orders")
      .then((res) => setOrders(res.data));

    axios.get("http://127.0.0.1:5000/orders/custom")
      .then((res) => setCustoms(res.data));
  };

  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const pendingCustoms = customs.filter(c => c.status === "Pending").length;

  const totalRevenue = orders
    .filter(o => o.status === "Delivered")
    .reduce((sum, o) => sum + Number(o.price), 0);

  const latestOrders = orders.slice(0, 5);
  const latestCustom = customs[0];

  return (
    <div>
      <AdminNavbar />

      <div style={{
        marginTop: "40px",
        marginLeft: window.innerWidth > 768 ? "240px" : "20px",
        padding: "25px",
        minHeight: "100vh"
      }}>
        <h1 style={{ color: "#4a148c" }}>👑 Pipe Cleaner Admin Analytics</h1>

        {/* TOP STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "25px"
        }}>
          <StatCard icon="📦" title="Products" value={products.length} color="#8e24aa" />
          <StatCard icon="🧾" title="Orders" value={orders.length} color="#3949ab" />
          <StatCard icon="⏳" title="Pending" value={pendingOrders} color="#fb8c00" />
          <StatCard icon="🎨" title="Custom Requests" value={pendingCustoms} color="#2e7d32" />
        </div>

        {/* SECOND ROW */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginTop: "30px"
        }}>

          {/* RECENT ORDERS */}
          <div style={panelStyle}>
            <h3 style={{ color: "#6a1b9a" }}>🕒 Recent Orders</h3>

            {latestOrders.map((o) => (
              <div key={o.id} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #eee"
              }}>
                <span>{o.customer_name} - {o.product_name}</span>
                <span style={{
                  color:
                    o.status === "Delivered"
                      ? "green"
                      : o.status === "Cancelled"
                      ? "red"
                      : "#ff9800"
                }}>
                  {o.status}
                </span>
              </div>
            ))}

            <button onClick={() => navigate("/admin-orders")} style={btn("#3949ab")}>
              View All Orders
            </button>
          </div>

          {/* REVENUE */}
          <div style={panelStyle}>
            <h3 style={{ color: "#6a1b9a" }}>💰 Revenue Summary</h3>

            <h1 style={{ color: "#2e7d32" }}>Rs {totalRevenue}</h1>

            <p>Delivered Orders Income</p>

            <div style={progressOuter}>
              <div style={{
                ...progressInner,
                width: `${orders.length ? (deliveredOrders / orders.length) * 100 : 0}%`
              }} />
            </div>

            <p>{deliveredOrders} of {orders.length} orders delivered</p>
          </div>
        </div>

        {/* THIRD ROW */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "25px",
          marginTop: "30px"
        }}>
          <QuickBox
            title="Manage Products"
            text="Add / Edit handmade items"
            btnText="Open"
            color="#8e24aa"
            click={() => navigate("/admin-products")}
          />

          <QuickBox
            title="Manage Orders"
            text="Track all customer orders"
            btnText="Open"
            color="#3949ab"
            click={() => navigate("/admin-orders")}
          />

          <QuickBox
            title="Custom Requests"
            text="Approve custom design orders"
            btnText="Open"
            color="#2e7d32"
            click={() => navigate("/admin-custom")}
          />
        </div>

        {/* LAST CUSTOM REQUEST */}
        {latestCustom && (
          <div style={{
            ...panelStyle,
            marginTop: "35px"
          }}>
            <h3 style={{ color: "#6a1b9a" }}>🎨 Latest Custom Request Preview</h3>

            <div style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <img
                src={`http://127.0.0.1:5000/uploads/${encodeURIComponent(latestCustom.image)}`}
                alt=""
                style={{
                  width: "180px",
                  height: "140px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  background: "#fafafa"
                }}
              />

              <div>
                <p><b>Customer:</b> {latestCustom.customer_name}</p>
                <p><b>Description:</b> {latestCustom.description}</p>
                <p><b>Budget:</b> Rs {latestCustom.budget}</p>
                <p><b>Status:</b> {latestCustom.status}</p>

                <button
                  onClick={() => navigate("/admin-custom")}
                  style={btn("#2e7d32")}
                >
                  Review Request
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* SMALL COMPONENTS */
function StatCard({ icon, title, value, color }) {
  return (
    <div style={{
      background: color,
      color: "white",
      padding: "25px",
      borderRadius: "18px",
      boxShadow: "0 8px 18px rgba(0,0,0,0.15)"
    }}>
      <h3>{icon} {title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

function QuickBox({ title, text, btnText, color, click }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ color }}>{title}</h3>
      <p>{text}</p>
      <button onClick={click} style={btn(color)}>{btnText}</button>
    </div>
  );
}

const panelStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const progressOuter = {
  width: "100%",
  height: "14px",
  background: "#eee",
  borderRadius: "20px",
  marginTop: "10px"
};

const progressInner = {
  height: "100%",
  background: "#43a047",
  borderRadius: "20px"
};

const btn = (color) => ({
  marginTop: "15px",
  background: color,
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer"
});

export default AdminDashboard;