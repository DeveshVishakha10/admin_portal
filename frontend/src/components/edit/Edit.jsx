import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



export const Edit = () => {
    const [state, setState] = useState({
        f_name: "",
        l_name: "",
        email: "",
        mobile: "",
        message: ""
    })
    const {id} = useParams();

    const _useNavigate=useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3004/contact/"+id)
            .then((res) => {
                // console.log(res);
                setState(res.data)

            })

    },[]);


    const handleChange = (event) => {
        const{name,value}=event.target;
        setState({...state,[name]:value})


    }

    const updatedata = (event) => {
        event.preventDefault();
        axios.put("http://localhost:3004/contact/"+id,state)
            .then((res) => {console.log(res);
                _useNavigate("/contactlist")

            })

    }
    return (
        <div className="container mt-5">
            <h3 className="mb-4" style={{textAlign:'center'}}>Update Here</h3>
            <form onSubmit={updatedata}>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            name="f_name"
                            value={state.f_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            name="l_name"
                            value={state.l_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Mobile number"
                            name="mobile"
                            value={state.mobile}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-12">
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Your message"
                            name="message"
                            value={state.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Update</button>
            </form>

        </div>
    )
}
