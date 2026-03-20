import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from "./components/screens/LoginScreen";
import ProductDetails from "./components/screens/ProductDetails";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Routes>
              <Route path="/signup" element={<SignupScreen />} />
            </Routes>
            <Routes>
              <Route pate="/login" element={<LoginScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
