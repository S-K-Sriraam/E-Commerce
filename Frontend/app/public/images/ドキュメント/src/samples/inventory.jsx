import React from "react";

function Inventory(props) {
  return (
    <>
      <div>Inventory</div>
      {props.person && (
        <>
          <h4>Person Details Accessed through Props</h4>
          <ul>
            <li>Name: {props.person.name}</li>
            <li>Role: {props.person.role}</li>
            <li>Age: {props.person.age}</li>
            <li>Weight: {props.size}</li>
          </ul>
        </>
      )}
    </>
  );
}

export default Inventory;
