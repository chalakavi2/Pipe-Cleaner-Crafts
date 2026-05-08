import { useEffect, useState } from "react";
import axios from "axios";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/products")
      .then((res) => setProducts(res.data));
  }, []);

  const categories = [
    "All",
    "Flower Vase",
    "Lamp Shades",
    "Wall Hanging",
    "Flower Bouquets",
    "Saree Brooch",
    "Hair Clips",
    "Other Crafts"
  ];

  return (
    <div style={{ background: "#faf7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🌸 Pipe Cleaner Crafts 🌸</h1>

        <input
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.categoryWrap}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryBtn,
                background:
                  selectedCategory === cat
                    ? "linear-gradient(to right, #6a1b9a, #ad1457)"
                    : "#eee",
                color: selectedCategory === cat ? "white" : "#333"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={styles.grid}>
        {products
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .filter((p) =>
            selectedCategory === "All" ? true : p.category === selectedCategory
          )
          .map((p) => (
            <div key={p.id} style={styles.card}>
              <img
                src={`http://127.0.0.1:5000/uploads/${p.image}`}
                alt={p.name}
                style={styles.image}
                onClick={() => setSelectedProduct(p)}
              />

              <h4 style={styles.name}>{p.name}</h4>

              <p style={styles.price}>Rs {p.price}</p>

              <button onClick={() => addToCart(p)} style={styles.cartBtn}>
                Add to Cart 🛒
              </button>
            </div>
          ))}
      </div>

      {/* QUICK VIEW POPUP */}
      {selectedProduct && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: "10px" }}>{selectedProduct.name}</h2>

            <img
              src={`http://127.0.0.1:5000/uploads/${selectedProduct.image}`}
              alt={selectedProduct.name}
              style={styles.modalImg}
            />

            <p style={{ fontSize: "14px", color: "#555" }}>
              {selectedProduct.description}
            </p>

            <h3 style={{ color: "#6a1b9a" }}>Rs {selectedProduct.price}</h3>

            <button
              onClick={() => addToCart(selectedProduct)}
              style={styles.modalCart}
            >
              Add to Cart 🛒
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    padding: "10px 15px",
    textAlign: "center",
    background: "linear-gradient(to right, #fce4ec, #f3e5f5)"
  },

  title: {
    fontSize: "clamp(22px, 5vw, 34px)",
    marginBottom: "15px"
  },

  search: {
    padding: "12px",
    width: "90%",
    maxWidth: "380px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  categoryWrap: {
    marginTop: "18px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px"
  },

  categoryBtn: {
    padding: "9px 15px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
    padding: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  image: {
    width: "100%",
    height: "170px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#fafafa",
    cursor: "pointer"
  },

  name: {
    margin: "12px 0 6px",
    fontSize: "15px",
    minHeight: "40px"
  },

  price: {
    color: "#6a1b9a",
    fontWeight: "bold",
    fontSize: "15px"
  },

  cartBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(to right, #6a1b9a, #ad1457)",
    color: "white",
    cursor: "pointer",
    marginTop: "10px"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    zIndex: 9999
  },

  modal: {
    background: "white",
    width: "100%",
    maxWidth: "370px",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "center"
  },

  modalImg: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "10px"
  },

  modalCart: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "20px",
    background: "#6a1b9a",
    color: "white",
    cursor: "pointer"
  },

  closeBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "20px",
    background: "#ddd",
    cursor: "pointer"
  }
};

export default Products;