import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../ProductStyles.css';


function ProductScreen({ product }) {
  return (
    <Card className="product-card p-3 rounded shadow-sm">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} className="product-image" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h5">
          <div className="my-2">
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h6">
          <div className="my-2">₹ {product.price}</div>
        </Card.Text>
        <Card.Text as="h6">
          <Link className="my-2 text-success" to={`/product/${product._id}`}>
            View More
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductScreen;
