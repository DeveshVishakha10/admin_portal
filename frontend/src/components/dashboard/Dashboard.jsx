import React, { useState } from 'react'
import axios from "axios";





// export const Dashboard = () => {
//   const [state, setState] = useState(0)
//   // console.log(useState(0))

//   const [color, setcolor] = useState("Red")
//   // console.log(useState("Red"))

//   const [store, setStore] = useState([])


//   const increment = () => {
//     setState(state + 1);
//   };
//   const decrement = () => {
//     setState(state - 1);
//   };
//   const colorchange = () => {
//     setcolor("Yellow");
//   };

//   const getlivedata = () => {
//     axios.get("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => {
//         setStore(res.data);
//       })


//   };

export const Dashboard = () => {
  return (
    <>
      <div>
        <table className="table" style={{ backgroundColor: 'white', color: 'black', marginTop: '20px' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John</td>
              <td>Doe</td>
              <td>@social</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
