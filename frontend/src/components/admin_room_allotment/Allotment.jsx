import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Pagination from '@mui/material/Pagination';

const roomMap = {
  'Adani Shantigram HO': ['Room A', 'Room B', 'Room C', 'Room D', 'Room E', 'Room F', 'No Availability'],
  'Prahladnagar HO': ['Room G', 'Room H', 'Room I', 'Room J', 'No Availability'],
  'VGPL': ['Room K', 'Room L', 'Room M', 'Room N', 'No Availability'],
  'VRPL': ['Room O', 'Room P', 'Room Q', 'No Availability'],
  'VPPL': ['Room R', 'Room S', 'Room T', 'Room U', 'No Availability'],
  'VMPL': ['Room V', 'Room W', 'Room X', 'Room Y', 'Room Z', 'No Availability']
};

export const Allotment = () => {
  const [store, setStore] = useState([]);
  const [roomSelections, setRoomSelections] = useState({});
  const [declineMessages, setDeclineMessages] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const [CheckingDate, setCheckingDate] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const getLiveData = () => {
    axios.get('http://localhost:3000/contact')
      .then((res) => setStore(res.data))
      .catch((err) => console.error('Error fetching data', err));
  };

  useEffect(() => {
    getLiveData();
  }, []);

  const handleSelectChange = (bookingId, value) => {
    setRoomSelections((prev) => ({
      ...prev,
      [bookingId]: value
    }));
  };

  const handleSubmit = (bookingId) => {
    const selectedRoom = roomSelections[bookingId];
    const declineMessage = declineMessages[bookingId];

    if (!selectedRoom) {
      alert("Please select a room!");
      return;
    }

    if (selectedRoom !== 'No Availability') {
      alert(`${selectedRoom}: Room already selected no requirement of a message`);
      return;
    }



    if (selectedRoom === 'No Availability' && !declineMessage?.trim()) {
      alert("Please write rejection message for 'No Availability'");
      return;
    }

    const item = store.find((entry) => entry.booking_id === bookingId);
    if (!item || !item.id) {
      alert("Invalid booking ID or missing ID in data");
      return;
    }

    setDisabledButtons((prev) => ({
      ...prev,
      [bookingId]: true
    }));

    const payload = {
      assigned_room: selectedRoom,
      rejection_reason: declineMessage?.trim() || null
    };

    axios.patch(`http://localhost:3000/contact/${item.id}`, payload)
      .then(() => {
        alert(`Room '${selectedRoom}' assigned to booking ID ${bookingId}`);
        getLiveData();
      })
      .catch((err) => {
        console.error('Error updating assignment:', err);
        alert("Something went wrong while assigning the room");
        setDisabledButtons((prev) => ({
          ...prev,
          [bookingId]: false
        }));
      });
  };

  // Filtered + Paginated data
  const filteredData = store.filter((item) => !CheckingDate || item.current_date === CheckingDate);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row align-items-center">
          <div className="col-md-6 mb-2">
            <label><b>Filter by Date:</b></label>
            <DatePicker
              style={{ width: '100%' }}
              value={CheckingDate ? dayjs(CheckingDate) : null}
              onChange={(_, dateString) => {
                setCheckingDate(dateString);
                setCurrentPage(1); // reset to page 1 when filter changes
              }}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4 text-center">📅 Booking Allotments</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Location</th>
                <th>Current Date</th>
                <th>Purpose</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Conference Room</th>
                <th>Decline Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => {
                const roomOptions = roomMap[item.location] || [];
                const isAlreadyAssigned = !!item.assigned_room;

                return (
                  <tr key={item.id || index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.booking_id}</td>
                    <td>{item.location}</td>
                    <td>{item.current_date}</td>
                    <td>{item.purpose}</td>
                    <td>{item.date?.replace('T', ' ')}</td>
                    <td>{item.time?.replace('T', ' ')}</td>
                    <td>
                      {isAlreadyAssigned ? (
                        <span className="text-success fw-bold">{item.assigned_room}</span>
                      ) : (
                        <select
                          className="form-select"
                          value={roomSelections[item.booking_id] || ''}
                          onChange={(e) => handleSelectChange(item.booking_id, e.target.value)}
                        >
                          <option value="">--Pick Room--</option>
                          {roomOptions.map((room, i) => (
                            <option key={i} value={room}>{room}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rejecting reason"
                        value={declineMessages[item.booking_id] || ''}
                        onChange={(e) =>
                          setDeclineMessages((prev) => ({
                            ...prev,
                            [item.booking_id]: e.target.value
                          }))
                        }
                        disabled={isAlreadyAssigned}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleSubmit(item.booking_id)}
                        disabled={isAlreadyAssigned || disabledButtons[item.booking_id]}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center">No data found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {filteredData.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
