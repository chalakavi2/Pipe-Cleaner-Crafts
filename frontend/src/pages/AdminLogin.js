import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = () => {
    axios.post("http://127.0.0.1:5000/admin/login", {
      email,
      password
    })
    .then((res) => {
      alert(res.data.message);

      if (res.data.message.includes("success")) {
        navigate("/admin-dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Admin login failed");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Login 👑</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={loginAdmin}>Login</button>
    </div>
  );
}

export default AdminLogin;