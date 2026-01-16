import React from "react";
import "./App.css";
import Inventory from "./samples/inventory";
import Navbar from "./components/navbar";
import Counter from "./components/Counter";
import UpdateCounterSeprate from "./samples/UpdateCounterSeprate";
import FilterableProductTable from "./samples/FilterableProductTable";

function App() {
  // const courses = [
  //   { id: 1, title: "JAVA", price: 2500 },
  //   { id: 2, title: "PYTHON", price: 4000 },
  //   { id: 3, title: "HTML", price: 2500 },
  //   { id: 4, title: "JAVASCRIPT", price: 4000 },
  // ];

  // const getListItem = courses.map((course) => (
  //   <li key={course.id}>
  //     {course.title} | ₹{course.price}
  //   </li>
  // ));

  // const purchase = () => console.log("Course is purchased...");

  return (
    <>
      <Navbar />
      {/* <div className="container">
        <Inventory />
        <h3>Guvi Courses (Mapping)</h3>
        <ul>{getListItem}</ul>
        <button onClick={purchase}>Access Now</button>

        <Inventory
          size={150}
          person={{
            name: "Sriraam",
            role: "Full Stack Developer",
            age: 19,
          }}
        />
        <hr />
        <Counter />
        <hr />
        <UpdateCounterSeprate />
      </div> */}

      {/* <div className="container">
        <FilterableProductTable />
      </div> */}
    </>
  );
}

export default App;
