const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

// ================= IMAGE UPLOAD SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ================= ADMIN LOGIN =================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ message: "Admin login success" });
  }

  res.json({ message: "Invalid admin credentials" });
});

// ================= ADD PRODUCT =================
router.post("/add-product", upload.single("image"), (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO products (name, description, price, image, category) VALUES (?,?,?,?,?)";

  db.query(sql, [name, description, price, image, category], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    res.json({ message: "Product added successfully ✅" });
  });
});

// ================= UPDATE PRODUCT =================
router.put("/update-product/:id", upload.single("image"), (req, res) => {
  const { name, description, price, category } = req.body;

  // FIRST GET OLD IMAGE
  db.query(
    "SELECT image FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.json(err);

      // keep old image if no new image selected
      const oldImage = result[0]?.image;

      const image = req.file
        ? req.file.filename
        : oldImage;

      const sql = `
        UPDATE products
        SET name=?, description=?, price=?, category=?, image=?
        WHERE id=?
      `;

      db.query(
        sql,
        [
          name,
          description,
          price,
          category,
          image,
          req.params.id,
        ],
        (err2) => {
          if (err2) return res.json(err2);

          res.json({
            message: "Product updated successfully ✅",
          });
        }
      );
    }
  );
});

// ================= DELETE =================
router.delete("/delete-product/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Deleted successfully ✅" });
  });
});

// ================= GET ORDERS =================
router.get("/orders", (req, res) => {
  const sql = `
    SELECT o.*, c.image
    FROM orders o
    LEFT JOIN custom_orders c
    ON o.custom_id = c.id
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

module.exports = router;