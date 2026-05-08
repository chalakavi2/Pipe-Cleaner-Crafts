import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios.post("http://127.0.0.1:5000/auth/login", {
      email,
      password
    }).then((res) => {
      if (res.data.token) {
        setUser(res.data.user);
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/products");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #ffd6e8, #e0c3fc)",
      padding: "20px"
    }}>

      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",          // ✅ important for responsiveness
        width: "100%",
        maxWidth: "850px",
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)"
      }}>

        {/* LEFT IMAGE SIDE */}
        <div style={{
          flex: "1 1 300px",       // ✅ responsive flex
          background: "#fff7fb",
          textAlign: "center",
          padding: "20px"
        }}>
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzYzOGN3MGlobnJnOTliaDBwOHIyZ256YnFleTZzenBhbGxrZGNjYSZlcD12MV9pbnRlcm5hbGZfYnlfaWQmY3Q9Zw/yx8pLBYNHc7Wrzzddt/giphy.gif"
            alt=""
            style={{
              width: "100%",
              maxWidth: "300px",   // ✅ prevents overflow
              borderRadius: "15px"
            }}
          />

          <h2 style={{ color: "#c2185b" }}>Pipe Cleaner Crafts Paradise ✨</h2>
          <p>Create • Decorate • Gift • Smile</p>
        </div>

        {/* RIGHT FORM SIDE */}
        <div style={{
          flex: "1 1 300px",       // ✅ responsive flex
          padding: "40px 30px",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#7b1fa2" }}>Welcome Back 💜</h1>
          <p>Login to order handmade colorful creations</p>

          <input
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            style={{ width: "100%", padding: "10px" }}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "10px",
              background: "#7b1fa2",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Login Now
          </button>

          <p style={{ marginTop: "20px" }}>
            New Customer? <Link to="/register">Create Account</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;