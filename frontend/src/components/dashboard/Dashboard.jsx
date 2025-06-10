import React, { useState } from 'react'
import axios from "axios";


export const Dashboard = () => {
  const [state, setState] = useState(0)
  // console.log(useState(0))

  const [color, setcolor] = useState("Red")
  // console.log(useState("Red"))

  const [store, setStore] = useState([])


  const increment = () => {
    setState(state + 1);
  };
  const decrement = () => {
    setState(state - 1);
  };
  const colorchange = () => {
    setcolor("Yellow");
  };

  const getlivedata = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setStore(res.data);
      })


  };



  return (
    <>
      <header>
        
      </header>


    </>
  )
}
