import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import "../ProductStyles.css";
import { listProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

function Home() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const productList = useSelector((state) => state.productList);
  const { error = null, loading = false, products = [] } = productList || {};

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const byQuery = products.filter((product) => {
      const name = (product?.name || "").toLowerCase();
      const brand = (product?.brand || "").toLowerCase();
      const category = (product?.category || "").toLowerCase();
      return (
        !normalizedQuery ||
        name.includes(normalizedQuery) ||
        brand.includes(normalizedQuery) ||
        category.includes(normalizedQuery)
      );
    });

    if (sortBy === "priceLowHigh") {
      return [...byQuery].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "priceHighLow") {
      return [...byQuery].sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "rating") {
      return [...byQuery].sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return byQuery;
  }, [products, query, sortBy]);

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h1>Find Your Next Favorite Gadget</h1>
        <p>
          Handpicked electronics, quick checkout, and secure ordering from one
          clean storefront.
        </p>
        <div className="hero-stats">
          <span>{products.length} Products</span>
          <span>Fast Delivery</span>
          <span>Trusted Sellers</span>
        </div>
      </section>

      <section className="product-toolbar">
        <Form.Control
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product, brand, or category"
        />
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </Form.Select>
      </section>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : filteredProducts.length === 0 ? (
        <Message variant='info'>No products match your search.</Message>
      ) : (
        <Row>
          {filteredProducts.map((product, index) => (
            <Col
              key={product._id || product.id}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="product-col"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
