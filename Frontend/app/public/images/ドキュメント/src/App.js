import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<News key="general" pageSize={9} country="us" />}
          />
          <Route
            path="/business"
            element={
              <News
                key="business"
                pageSize={9}
                category="business"
                country="us"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                pageSize={9}
                category="entertainment"
                country="us"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                key="general"
                pageSize={9}
                category="general"
                country="us"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News key="health" pageSize={9} category="health" country="us" />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                pageSize={9}
                category="science"
                country="us"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News key="sports" pageSize={9} category="sports" country="us" />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                pageSize={9}
                category="technology"
                country="us"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
