import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios.get("http://127.0.0.1:5000/products")
      .then((res) => setProducts(res.data));
  };

  // SAVE / UPDATE PRODUCT
  const saveProduct = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    if (editId) {
      axios.put(
        `http://127.0.0.1:5000/admin/update-product/${editId}`,
        formData
      ).then(() => {
        alert("Product Updated");
        clearForm();
        loadProducts();
      });
    } else {
      axios.post(
        "http://127.0.0.1:5000/admin/add-product",
        formData
      ).then(() => {
        alert("Product Added");
        clearForm();
        loadProducts();
      });
    }
  };

  const editProduct = (p) => {
    setEditId(p.id);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setCategory(p.category);
  };

  const deleteProduct = (id) => {
    axios.delete(`http://127.0.0.1:5000/admin/delete-product/${id}`)
      .then(() => loadProducts());
  };

  const clearForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage(null);
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{
      marginTop: "30px",
      marginLeft: window.innerWidth > 768 ? "240px" : "20px",
      padding: "20px"
    }}>
        <h1>📦 Products Management</h1>

        {/* FORM */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br /><br />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option>Flower Vase</option>
            <option>Lamp Shades</option>
            <option>Wall Hanging</option>
            <option>Flower Bouquets</option>
            <option>Saree Brooch</option>
            <option>Hair Clips</option>
            <option>Other Crafts</option> 
          </select>

          <br /><br />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <br /><br />

          <button
            onClick={saveProduct}
            style={{
              padding: "8px 15px",
              background: "#6a1b9a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* PRODUCT LIST */}
        <h3>Products</h3>

        {products.map((p) => (
          <div key={p.id} style={{
            background: "white",
            padding: "30px",
            marginBottom: "20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap"
          }}>

            {/* IMAGE */}
            <img
              src={`http://127.0.0.1:5000/uploads/${p.image}`}
              alt={p.name}
              style={{
                width: "100px",
                height: "80px",
                borderRadius: "6px",
                objectFit: "cover"
              }}
            />

            {/* TEXT */}
            <div style={{ flex: 1, fontSize: "13px" }}>
              <b>{p.name}</b> | {p.category} | Rs {p.price}
            </div>

            {/* ICON BUTTONS */}
            <div style={{
              display: "flex",
              gap: "10px",
              alignItems: "center"
            }}>

              <FaEdit
                onClick={() => editProduct(p)}
                style={{
                  cursor: "pointer",
                  color: "#6a1b9a",
                  fontSize: "16px"
                }}
                title="Edit"
              />

              <FaTrash
                onClick={() => deleteProduct(p.id)}
                style={{
                  cursor: "pointer",
                  color: "red",
                  fontSize: "16px"
                }}
                title="Delete"
              />
              
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;