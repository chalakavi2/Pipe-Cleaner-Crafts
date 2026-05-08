const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

// SAVE ORDER
router.post("/save", (req, res) => {
  const { customer_name, address, phone, cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart empty" });
  }

  let completed = 0;

  cart.forEach((item) => {
    const sql = `
      INSERT INTO orders
      (customer_name, address, phone, product_name, price, qty, status, image)
      VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(
      sql,
      [
        customer_name,
        address,
        phone,
        item.name,
        item.price,
        item.qty || 1,
        "Pending",
        item.image   // 🔥 SAVE PRODUCT IMAGE
      ],
      (err) => {
        if (err) {
          console.log(err);
        }

        completed++;

        if (completed === cart.length) {
          res.json({ message: "Order placed successfully ✅" });
        }
      }
    );
  });
});


// MY ORDER HISTORY  (ONLY ONE ROUTE)
router.get("/history/:name", (req, res) => {
  console.log("FETCH HISTORY FOR:", req.params.name);

  db.query(
    "SELECT * FROM orders WHERE customer_name = ? ORDER BY id DESC",
    [req.params.name],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }

      console.log("FOUND ORDERS:", result);
      res.json(result);
    }
  );
});


// ADMIN ALL ORDERS
router.get("/all", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});


// UPDATE STATUS
router.put("/status/:id", (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Status updated" });
    }
  );
});

// CUSTOMER CANCEL ORDER
router.delete("/cancel/:id", (req, res) => {
  db.query("UPDATE orders SET status='Cancelled' WHERE id=?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Order cancelled successfully ❌" });
  });
});

// ================= IMAGE UPLOAD =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// ================= CUSTOMER SEND REQUEST =================

router.post("/custom", upload.single("image"), (req, res) => {
  const { customer_name, description, budget } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO custom_orders (customer_name, description, image, budget)
    VALUES (?,?,?,?)
  `;

  db.query(sql, [customer_name, description, image, budget], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Custom request sent ✅" });
  });
});

// ================= ADMIN GET REQUESTS =================

router.get("/custom", (req, res) => {
  db.query("SELECT * FROM custom_orders ORDER BY id DESC", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ================= ADMIN APPROVE / REJECT =================
router.put("/custom/:id", (req, res) => {
  const { status, price } = req.body;

  db.query(
    "UPDATE custom_orders SET status=?, price=? WHERE id=?",
    [status, price, req.params.id],
    (err) => {
      if (err) return res.json(err);

      db.query(
        "SELECT * FROM custom_orders WHERE id=?",
        [req.params.id],
        (err, result) => {
          if (err) return res.json(err);

          const data = result[0];
          const image = data.image || null;

          // 🔥 BOTH APPROVED & REJECTED INSERT
          db.query(
            `INSERT INTO orders 
            (customer_name, address, phone, product_name, price, qty, status, custom_id, image)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
              data.customer_name,
              "Custom Order",
              "N/A",
              "Custom Craft",
              status === "Approved" ? price : 0,
              1,
              status,   // 🔥 Approved OR Rejected
              data.id,
              image
            ],
            (err2) => {
              if (err2) return res.json(err2);

              res.json({ message: "Updated + Synced to Orders ✅" });
            }
          );
        }
      );
    }
  );
});

// ================= GET MY ORDERS (JOIN IMAGE) =================

router.get("/history/:name", (req, res) => {
  const sql = `
    SELECT 
      o.*,
      COALESCE(o.image, c.image) AS image
    FROM orders o
    LEFT JOIN custom_orders c 
    ON o.custom_id = c.id
    WHERE o.customer_name = ?
    ORDER BY o.id DESC
  `;

  db.query(sql, [req.params.name], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});



module.exports = router;