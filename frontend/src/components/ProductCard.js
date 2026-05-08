function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
      <img src={product.image} width="150" alt="" />
      <h3>{product.name}</h3>
      <p>Rs. {product.price}</p>
    </div>
  );
}

export default ProductCard;