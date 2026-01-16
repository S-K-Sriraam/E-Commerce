// components/Counter.jsx
import React, { useState } from 'react';
import Button from '../samples/Button';


function Counter() {
  const [count, setCount] = useState(0);

  function Increment() {
    setCount(count + 1);
  }

  // count = 0
  // after click setCount(0+1) = 1 count = 1
  // after click setCount(1+1) = 2 count = 2
  // after click setCount(2+1) = 3 count = 3

  // function MyButton({count, onClick}){
  //   return(
  //     <button onClick={onClick}>Click me: {count}</button>
  //   )
  // }

  return (
    <>
      <div>Counter</div>
      {/* <button onClick={Increment}>Click me: {count}</button>
      <button onClick={Increment}>Click me: {count}</button> */}
      {/* <MyButton count={count} onClick={Increment}/> */}
      
      <Button count={count} onClick={Increment}/>

    </>
  );
}

export default Counter;
