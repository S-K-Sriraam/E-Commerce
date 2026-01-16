// src/components/screens/ProductScreen.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../ProductStyles.css'; // correct path from components/screens to src/ProductStyles.css

function ProductScreen({ product }) {
  const productId = product?._id ?? product?.id ?? "";

  return (
    <Card className="product-card p-3 rounded shadow-sm">
      <Link to={`/product/${productId}`}>
        <Card.Img
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "Product image"}
          className="product-image"
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${productId}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Card.Title as="h5" className="mb-2">
            {product?.name ?? "Unnamed product"}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <strong>Price:</strong> {product?.price != null ? `₹ ${product.price}` : "—"}
        </Card.Text>

        <Card.Text as="div" className="mb-2">
          <strong>Rating:</strong> {product?.rating ?? "N/A"} ({product?.numReviews ?? 0} reviews)
        </Card.Text>

        <div>
          <Link to={`/product/${productId}`} className="btn btn-outline-primary btn-sm">
            View More
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductScreen;
