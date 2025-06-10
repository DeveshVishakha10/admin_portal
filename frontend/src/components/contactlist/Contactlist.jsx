import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';


export const Contactlist = () => {
    const [store, setStore] = useState([]);

    const getalldata = () => {
        axios.get("http://localhost:3004/contact")
            .then((res) => setStore(res.data))
            .catch((err) => console.error("Error fetching contacts:", err));

    }

    useEffect(() => {
    getalldata();
    }, []);


    const deleterecord = (id) => {
        Swal.fire({
            title: "Are you sure yo want to delete thid Id?" + id,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3004/contact/" + id)
                    .then((res) => { console.log(res); })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                getalldata();
            }
        });

    }

    return (
        <>
            <div className="my_title">Contactlist</div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.map((item, index) => (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.f_name}</td>
                                        <td>{item.l_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.message}</td>
                                        <td>
                                            <Link to={`/edit/${item.id}`} className='btn btn-success'>Edit</Link>&nbsp;
                                            <a href="#" className='btn btn-danger' onClick={() => { deleterecord(item.id) }}>Delete</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
