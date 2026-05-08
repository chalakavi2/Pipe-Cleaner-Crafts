const express = require("express");
const router = express.Router();
const multer = require("multer");

// storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// upload api
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `http://127.0.0.1:5000/uploads/${req.file.filename}`
  });
});

module.exports = router;