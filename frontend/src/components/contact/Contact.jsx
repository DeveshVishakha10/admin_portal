import React, { useState } from 'react';
import { useDate } from '../context/DateContext';
import axios from 'axios';

export const Contact = () => {
  const [section, setSection] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [msg, setmsg] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBookDate, setSelectedBookDate] = useState('');

  const {
    selectedDate,
    setSelectedDate,
    selectedDate2,
    setSelectedDate2
  } = useDate();

  const handleSubmit = () => {
    console.log('Selected Company:', selectedCompany);
    console.log('From Date:', selectedDate);
    console.log('To Date:', selectedDate2);
    setmsg('Form Submitted');
  };

  const handleUpload = () => {
    alert('Upload functionality not yet implemented');
  };

  const handleOpen = (e) => {
    e.preventDefault();
    axios.post('/api/your-endpoint', {
      location: selectedLocation,
      date: selectedBookDate,
    })
      .then(response => {
        console.log('Submitted:', response.data);
        setmsg('Booking Submitted');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const QRcode = () => {
    if (selectedLocation === 'PRAHLADNAGAR' && selectedBookDate) {
      return (
        <div className="mt-3 text-center">
          <img
            src="/Prahladnagar Canteen barcode.jpeg"
            alt="Prahladnagar QR"
            style={{ maxWidth: '200px', marginTop: '20px' }}
          />
          <div style={{ color: 'Red', marginTop: '20px' }}>Prahladnagar QR</div>
        </div>
      );
    }

    if (selectedLocation === 'SHANTIGRAM') {
      return (
        <div className="mt-3 text-center">
          <img
            src="/Shantigram canteen barcode.png"
            alt="Shantigram QR"
            style={{ maxWidth: '200px', marginTop: '20px' }}
          />
          <div style={{ color: 'Red', marginTop: '20px' }}>Shantigram QR</div>
        </div>
      );
    }

    if (selectedLocation === 'VRPL') {
      return (
        <div className="mt-3 text-center">
          <img
            src="/VRPL Canteen barcode.png"
            alt="Shantigram QR"
            style={{ maxWidth: '200px', marginTop: '20px' }}
          />
          <div style={{ color: 'Red', marginTop: '20px' }}>VRPL QR</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mt-4">
      {/* Navigation Buttons */}
      <div className="row mb-4">
        {['menu', 'booking', 'cafeteria', 'wallet'].map((name, i) => (
          <div key={i} className="col-6 col-sm-3 mb-2">
            <button className="btn btn-danger w-100" onClick={() => setSection(name)}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          </div>
        ))}
      </div>

      {/* Menu Section */}
      {section === 'menu' && (
        <div className="container-fluid">
          <div className="row align-items-end flex-wrap">
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>Location Selection <span className="text-danger">*</span></b></label>
              <select
                className="form-select"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">--Select Company--</option>
                <option value="SHANTIGRAM">Shantigram HO</option>
                <option value="PRAHLADNAGAR">Prahladnagar HO</option>
                <option value="VGPL">VGPL</option>
                <option value="VMPL">VMPL</option>
                <option value="VRPL">VRPL</option>
                <option value="VPPL">VPPL</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>From Date</b></label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>To Date</b></label>
              <input
                type="date"
                className="form-control"
                value={selectedDate2}
                onChange={(e) => setSelectedDate2(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>Upload Excel File</b></label>
              <input
                type="file"
                className="form-control"
                id="excelUpload"
                accept=".xlsx,.xls"
              />
            </div>

            <div className="col-6 col-sm-3 col-md-1 mb-3">
              <button className="btn btn-primary w-100" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div className="col-6 col-sm-3 col-md-1 mb-3">
              <button className="btn btn-success w-100" onClick={handleUpload}>
                Upload
              </button>
            </div>
            {msg && (
              <div className="col-12 mt-2">
                <div className="alert alert-success p-2">{msg}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Section */}
      {section === 'booking' && (
        <div className="container-fluid">
          <div className="row align-items-end flex-wrap">
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>Location Selection <span className="text-danger">*</span></b></label>
              <select
                className="form-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">--Select Location--</option>
                <option value="SHANTIGRAM">Shantigram HO</option>
                <option value="PRAHLADNAGAR">Prahladnagar HO</option>
                <option value="VGPL">VGPL</option>
                <option value="VMPL">VMPL</option>
                <option value="VRPL">VRPL</option>
                <option value="VPPL">VPPL</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>Date</b></label>
              <input
                type="date"
                className="form-control"
                value={selectedBookDate}
                onChange={(e) => setSelectedBookDate(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <label><b>Payment Option</b></label><br />
              <input type="radio" name="paymentType" /> Cash
              <input type="radio" name="paymentType" style={{ marginLeft: '10px' }} /> Online


            </div>


            <div className="col-12 col-sm-6 col-md-2 mb-3">
              <button className="btn btn-primary w-100" onClick={handleOpen}>
                Payment
              </button>
            </div>
          </div>

          {/* QR Code Section */}
          {QRcode()}
        </div>
      )}

      {/* Other Sections */}
      {section === 'cafeteria' && (
        <div><h3>Hi, you selected Cafeteria</h3></div>
      )}

      {section === 'wallet' && (
        <div><h3>Hi, you selected Kitchen</h3></div>
      )}
    </div>
  );
};
