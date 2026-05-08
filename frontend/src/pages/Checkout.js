import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const customer_name = localStorage.getItem("user");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const placeOrder = () => {
    axios.post("http://127.0.0.1:5000/orders/save", {
      customer_name,
      address,
      phone,
      cart
    })
    .then((res) => {
      setSuccessMsg(res.data.message);
      setCart([]);

      setTimeout(() => {
        navigate("/my-orders");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f2ff",
      paddingTop: "50px"
    }}>

      <div style={{
        textAlign: "center",
        background: "white",
        width: "420px",
        margin: "auto",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ color: "#7b1fa2" }}>Checkout 💳</h2>

        <h3>User: {customer_name}</h3>

        <input
          placeholder="Delivery Address"
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "90%", padding: "10px" }}
        />
        <br /><br />

        <input
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "90%", padding: "10px" }}
        />
        <br /><br />

        <h3>Total Rs {total}</h3>

        <button
          onClick={placeOrder}
          style={{
            background: "#8e24aa",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Place Order ✅
        </button>

        {successMsg && (
          <div style={{
            marginTop: "25px",
            background: "#d4edda",
            color: "#155724",
            padding: "15px",
            borderRadius: "10px",
            fontWeight: "bold"
          }}>
            🎉 {successMsg}
            <br />
            Redirecting to My Orders...
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;