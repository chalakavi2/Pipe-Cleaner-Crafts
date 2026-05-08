const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      console.log("REGISTER ERROR:", err);
      return res.status(500).json({ message: err.sqlMessage || "Database error" });
    }

    res.json({ message: "User registered successfully ✅" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.json(err);

    if (result.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login success ✅",
      token,
      user: user.name,
    });
  });
});

module.exports = router;