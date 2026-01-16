// src/components/Home.jsx
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import "../ProductStyles.css";
import { listProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

function Home() {
  const dispatch = useDispatch();

  // IMPORTANT: select the same key you used in combineReducers.
  // My store example uses `productList` (not `productsList`).
  const productList = useSelector((state) => state.productList);

  // Safety fallback so destructuring doesn't crash when productList is undefined
  const { error = null, loading = false, products = [] } = productList || {};

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  console.log("products", products);

  return (
    <div>
      <h1 className="text-center mt-2">Brand New Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id || product.id} sm={12} md={6} lg={4} xl={4}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
