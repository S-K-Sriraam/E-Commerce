import React from 'react';
import products from '../products';
import { Row, Col } from 'react-bootstrap';
import ProductScreen from './screens/ProductScreen';
import '../ProductStyles.css';

function Home() {
  return (
    <div>
      <h1 className="text-center mt-2">Brand New Products</h1>

      <Row className="justify-content-center">
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="d-flex justify-content-center"
          >
            <ProductScreen product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
