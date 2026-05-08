const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();
const uploadRoutes = require("./routes/uploadRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", uploadRoutes);

// 🔍 log every request
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

// products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// order routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

// admin routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});