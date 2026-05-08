import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = () => {
    axios.post("http://127.0.0.1:5000/auth/register", {
      name,
      email,
      password
    })
    .then((res) => {
      alert(res.data.message);
      navigate("/");
    })
    .catch(() => {
      alert("Register failed");
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #ffe0f0, #d1c4e9)",
      padding: "20px"
    }}>
      
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",          // ✅ responsive enable
        width: "100%",
        maxWidth: "850px",
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)"
      }}>

        {/* LEFT SIDE */}
        <div style={{
          flex: "1 1 300px",
          background: "#fff7fb",
          textAlign: "center",
          padding: "20px"
        }}>
          <img
            src="https://i.pinimg.com/736x/58/0f/1d/580f1d90f4bfb6e6d7c2c7c9f70b7f7e.jpg"
            alt=""
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "15px",
              height: "auto",
              objectFit: "cover"
            }}
          />
          <h2 style={{ color: "#ad1457" }}>Join Our Craft Family 🎀</h2>
          <p>Handmade creativity delivered to your doorstep</p>
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          flex: "1 1 300px",
          padding: "40px 30px",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#6a1b9a" }}>Create Account ✨</h1>

          <input
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={registerUser}
            style={{
              width: "100%",
              padding: "10px",
              background: "#6a1b9a",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Register Now
          </button>

          <p style={{ marginTop: "20px" }}>
            Already have account? <Link to="/">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;