import { useState } from "react";
import axios from "axios";

function CustomOrder() {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");

  const submit = () => {
    const user = localStorage.getItem("user");

    if (!description || !budget || !image) {
      alert("Please fill all details and upload image");
      return;
    }

    const formData = new FormData();
    formData.append("customer_name", user);
    formData.append("description", description);
    formData.append("budget", budget);
    formData.append("image", image);

    axios.post("http://127.0.0.1:5000/orders/custom", formData)
      .then(res => {
        setMsg(res.data.message);
        setDescription("");
        setBudget("");
        setImage(null);
        setPreview(null);
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={styles.title}>🎨 Custom Craft Request</h2>
        <p style={styles.sub}>
          Upload your design idea and request a personalized handmade craft.
        </p>

        <textarea
          placeholder="Describe your custom order..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <input
          placeholder="Your Budget (Rs)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={styles.input}
        />

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
          style={styles.file}
        />

        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <button onClick={submit} style={styles.btn}>
          Send Request 🚀
        </button>

        {msg && <div style={styles.msg}>✅ {msg}</div>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#faf7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px"
  },

  box: {
    background: "white",
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  title: {
    color: "#6a1b9a",
    marginBottom: "10px"
  },

  sub: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px"
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "none",
    boxSizing: "border-box"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    boxSizing: "border-box"
  },

  file: {
    marginBottom: "15px",
    width: "100%"
  },

  preview: {
    width: "100%",
    maxHeight: "220px",
    objectFit: "contain",
    borderRadius: "12px",
    marginBottom: "15px",
    background: "#f9f9f9"
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #6a1b9a, #ad1457)",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px"
  },

  msg: {
    marginTop: "18px",
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "12px",
    borderRadius: "10px"
  }
};

export default CustomOrder;