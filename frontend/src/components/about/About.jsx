import axios from 'axios';
import React, { useState } from 'react';


export const About = () => {
  const [store, setStore] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState(''); // ✅ Message state
  







  return (
    <>
      <form>
        {/* Location Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-danger dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: '30%' }}
          >
            {selectedLocation || "Select Location"}
          </button>
          <ul className="dropdown-menu">
            {locationOptions.map((location, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  type="button"
                  value='location'
                  onClick={() => {
                    setSelectedLocation(location);
                    setSelectedRoom('');
                  }}
                >
                  {location}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <br />

        {/* Conference Room Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-danger dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: '30%' }}
            disabled={!selectedLocation}
          >
            {selectedRoom || "Select Conference Room"}
          </button>
          <ul className="dropdown-menu">
            {(conferenceRoomMap[selectedLocation] || []).map((room, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  type="button"
                  value='room_location'
                  onClick={() => setSelectedRoom(room)}
                >
                  {room}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <br />

        {/* Date Picker */}
        <div>
          <label>Date Selection: </label>
          <br />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <br />

        {/* Time Picker */}
        <div>
          <label>Time Selection: </label>
          <br />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <br />
        <input
          type="button"
          className="btn btn-primary"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>

      <br />
      {message && (
        <div
          style={{
            color: message.startsWith("✅") ? "green" : "red",
            fontWeight: 'bold',

          }}
        >
          {message}
        </div>

      )}
      <br />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Location</th>
            <th scope="col">Conference Room</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>


        </tbody>
      </table>


    </>
  );
};
