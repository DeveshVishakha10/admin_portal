import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Pagination from '@mui/material/Pagination'; // ✅ Import Pagination

function generateBookingID() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BOOK-${timestamp}-${random}`;
}

export const About = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCurrentDate, setSelectedCurrentDate] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [store, setStore] = useState([]);
  const [selectedBookingDate, setSelectedBookingDate] = useState('');

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocation || !selectedCurrentDate || !selectedPurpose || !selectedDate || !selectedTime) {
      setMessage("Please fill all fields.");
      return;
    }

    const booking_id = generateBookingID();

    const formData = {
      booking_id,
      location: selectedLocation,
      current_date: selectedCurrentDate,
      purpose: selectedPurpose,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      await axios.post('http://localhost:3000/contact', formData);
      setMessage(`Form submitted successfully! Booking ID: ${booking_id}`);
      getLiveData();
      setSelectedLocation('');
      setSelectedPurpose('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      console.error(error);
      setMessage('Error submitting form.');
    }
  };

  const getLiveData = () => {
    axios.get('http://localhost:3000/contact')
      .then((res) => setStore(res.data))
      .catch((err) => console.error('Error fetching data', err));
  };

  useEffect(() => {
    getLiveData();
  }, []);

  const filteredData = store.filter((entry) => {
    if (!selectedBookingDate) return true;
    return entry.current_date === selectedBookingDate;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label><b>Location <span style={{ color: "red" }}>*</span></b></label>
              <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="">---Select Location---</option>
                <option value="Adani Shantigram HO">Adani Shantigram HO</option>
                <option value="Prahladnagar HO">Prahladnagar HO</option>
                <option value="VGPL">VGPL</option>
                <option value="VMPL">VMPL</option>
                <option value="VRPL">VRPL</option>
                <option value="VPPL">VPPL</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label><b>Current Date</b></label>
              <DatePicker

                style={{ width: '100%' }}
                value={selectedCurrentDate ? dayjs(selectedCurrentDate) : null}
                onChange={(_, dateString) => {
                  setSelectedCurrentDate(dateString);
                }}

                format="YYYY-MM-DD"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <label><b>Message or Purpose of the Meeting.</b></label>
              <textarea className="form-control" placeholder="Enter purpose" value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label><b>From</b></label>
              <DatePicker

                style={{ width: '100%' }}
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(_, dateString) => {
                  setSelectedDate(dateString);
                }}
                showTime={{ use12Hours: true, format: 'hh:mm A' }}
                format="YYYY-MM-DD hh:mm A"
              />
            </div>


            <div className="col-md-6 mb-3">
              <label><b>To</b></label>
              <DatePicker

                style={{ width: '100%' }}
                value={selectedTime ? dayjs(selectedTime) : null}
                onChange={(_, dateString) => {
                  setSelectedTime(dateString);
                }}
                showTime={{ use12Hours: true, format: 'hh:mm A' }}
                format="YYYY-MM-DD hh:mm A"
              />
            </div>
          </div>
        </div >

        <br />
        <div className="row mb-3 ms-2 me-2">
          <button type="submit" className="btn btn-danger">Submit</button>
        </div>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form >


      <div className="container-fluid mt-3">
        <div className="row align-items-center">
          <div className="col-md-6 mb-2">
            <label><b>Filter by Date:</b></label>
            <DatePicker
              style={{ width: '100%' }}
              value={selectedBookingDate ? dayjs(selectedBookingDate) : null}
              onChange={(_, dateString) => {
                setSelectedBookingDate(dateString);
                setCurrentPage(1); // reset to page 1 when filter changes
              }}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div><br />

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered" style={{ borderCollapse: 'collapse' }}>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Booking ID</th>
              <th>Location</th>
              <th>Current Date</th>
              <th>Purpose</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr key={entry.id || index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{entry.booking_id || 'N/A'}</td>
                <td>{entry.location}</td>
                <td>{entry.current_date}</td>
                <td>{entry.purpose}</td>
                <td>{entry.date.replace('T', ' ')}</td>
                <td>{entry.time.replace('T', ' ')}</td>
                <td>{entry.assigned_room || 'Pending'}</td>
                <td>{entry.rejection_reason || ''}</td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      {
        filteredData.length > itemsPerPage && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </div>
        )
      }
    </>
  );
};
