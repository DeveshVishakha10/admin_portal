import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const About = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [store, setStore] = useState([]); // Added to store fetched data

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocation || !selectedDate || !selectedTime) {
      setMessage("Please fill all fields.");
      return;
    }

    const formData = {
      location: selectedLocation,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      await axios.post('http://localhost:3004/contact', formData);
      setMessage('Form submitted successfully!');
      getLiveData(); // refresh data after submission
    } catch (error) {
      console.error(error);
      setMessage('Error submitting form.');
    }
  };

  const getLiveData = () => {
    axios.get('http://localhost:3004/contact')
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => console.error('Error fetching data', err));
  };

  useEffect((event) => {
    getLiveData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="container-fluid">
          <div className="row">
            {/* Employee Name */}
            <div className="col-md-6 mb-3">
              <label><b>Employee Name</b></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>

            {/* Employee ID */}
            <div className="col-md-6 mb-3">
              <label><b>Employee ID</b></label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter ID"

              />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mb-3">

              <label><b>Company Selection</b></label>
              <select
                className="form-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">---Select Company---</option>
                <option value="VGPL Plant">VGPL</option>
                <option value="VMPL Plant">VMPL</option>
                <option value="VRPL Plant">VRPL</option>
                <option value="VPPL Plant">VPPL</option>
              </select>

            </div>
            <div className="col-md-6 mb-3">

              <label><b>Location</b></label>
              <select
                className="form-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">---Select Location---</option>
                <option value="Adani Shantigram HO Office">Adani Shantigram HO Office</option>
                <option value="Prahladnagar HO Office">Prahladnagar HO Office</option>
                <option value="VGPL Plant">VGPL Plant</option>
                <option value="VMPL Plant">VMPL Plant</option>
                <option value="VRPL Plant">VRPL Plant</option>
                <option value="VPPL Plant">VPPL Plant</option>
              </select>

            </div>
          </div>
        </div>


        <div className="container-fluid">
          <div className="row">

            <div className="col-md-6 mb-3">
              <label><b>Visitor's Name</b></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>


            <div className="col-md-6 mb-3">
              <label><b>Visitor's Company</b></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ID"

              />
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">

            <div className="col-md-6 mb-3">
              <label><b>Visitor's Mobile No.</b></label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter name"
              />
            </div>


            <div className="col-md-6 mb-3">
              <label><b>Visitor's Email</b></label>
              <input
                type="email"
                className="form-control"
                placeholder="Mail ID"

              />
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">

            <div className="col-md-12 mb-3">
              <label><b>Message or Purpose of the Meeting.</b></label>
              <input
                type="textarea"
                className="form-control"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* Employee Name */}
            <div className="col-md-6 mb-3">
              <label><b>Date</b></label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter name"
              />
            </div>

            {/* Employee ID */}
            <div className="col-md-6 mb-3">
              <label><b>Time</b></label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter ID"

              />
            </div>
          </div>
        </div>
        <br />



        <button type="submit" className="btn btn-danger">Submit</button>

        {message && (
          <div className="mt-3 alert alert-info">{message}</div>
        )}
      </form >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {store.map((entry, index) => (
            <tr key={entry.id || index}>
              <th scope="row">{index + 1}</th>
              <td>{entry.location}</td>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};
