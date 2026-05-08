import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2>Cart is Empty 😢</h2>
          <p>Add some beautiful crafts to continue shopping.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              <img
                src={`http://127.0.0.1:5000/uploads/${item.image}`}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.content}>
                <h3 style={{ margin: "0 0 5px" }}>{item.name}</h3>
                <p style={styles.price}>Rs {item.price}</p>

                <div style={styles.qty}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => decreaseQty(item.id)}
                  >
                    ➖
                  </button>

                  <span style={{ fontWeight: "bold" }}>{item.qty || 1}</span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => increaseQty(item.id)}
                  >
                    ➕
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={styles.remove}
              >
                ❌
              </button>
            </div>
          ))}

          {/* TOTAL BOX */}
          <div style={styles.totalBox}>
            <h2>Total Amount</h2>
            <h1 style={{ color: "#6a1b9a", margin: "10px 0" }}>Rs {total}</h1>

            <button
              onClick={() => navigate("/checkout")}
              style={styles.checkout}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    background: "#faf7fb",
    minHeight: "100vh"
  },

  title: {
    textAlign: "center",
    color: "#6a1b9a",
    marginBottom: "25px",
    fontSize: "clamp(24px, 5vw, 34px)"
  },

  emptyBox: {
    background: "white",
    maxWidth: "400px",
    margin: "40px auto",
    padding: "30px",
    textAlign: "center",
    borderRadius: "18px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  card: {
    display: "flex",
    gap: "15px",
    background: "white",
    padding: "15px",
    borderRadius: "16px",
    marginBottom: "15px",
    alignItems: "center",
    flexWrap: "wrap",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
  },

  image: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    borderRadius: "10px",
    background: "#f9f9f9"
  },

  content: {
    flex: 1,
    minWidth: "150px"
  },

  price: {
    color: "#6a1b9a",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  qty: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap"
  },

  qtyBtn: {
    border: "none",
    background: "#eee",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  remove: {
    background: "#ff1744",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer"
  },

  totalBox: {
    marginTop: "30px",
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  checkout: {
    background: "linear-gradient(to right, #6a1b9a, #ad1457)",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "25px",
    marginTop: "10px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    fontSize: "15px"
  }
};

export default Cart;