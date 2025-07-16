import React from 'react';
import { Link } from 'react-router-dom';
import '../../header.css';

export const Header = () => {
  const Welcome = () => {
    return <div>Welcome to Vishakha Admin Portal</div>;
  };

  return (
    <>
      <div className="header-container">
        <img src="/Vishakha image.jpg" alt="Vishakha Polyfab" className="logo" />
        <div className="marquee-wrapper">
          <div className="welcome-text">
            <Welcome />
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Helpdesk */}
              <li className="nav-item">
                <img
                  src="/help-desk_4939493.png"
                  alt="Helpdesk"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link active custom-link" to="">
                  Helpdesk
                </Link>
              </li>

              {/* Conference Room */}
              <li className="nav-item dropdown">
                <img
                  src="/meeting-room_1693663.png"
                  alt="Conference Room"
                  style={{ width: '40px', height: '40px', marginLeft: '45px' }}
                />
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Conference Room
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="about">
                      Room Booking
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="admin_room_allotment">
                      Admin Room Allotment
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="room_availability">
                      Room Availability
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              {/* Canteen */}
              <li className="nav-item">
                <img
                  src="/spoon_995802.png"
                  alt="Canteen"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link custom-link" to="contact">
                  Canteen
                </Link>
              </li>

              {/* Cab Book */}
              <li className="nav-item">
                <img
                  src="/book_2682678.png"
                  alt="Cab Book"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link custom-link" to="contact">
                  Cab Book
                </Link>
              </li>

              {/* Inventory */}
              <li className="nav-item">
                <img
                  src="/inventory_18546538.png"
                  alt="Inventory"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link custom-link" to="contact">
                  Inventory
                </Link>
              </li>

              {/* Stationery & Printing */}
              <li className="nav-item">
                <img
                  src="/stapler_6436685.png"
                  alt="Stationery & Printing"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link custom-link" to="contact">
                  Stationery & Printing
                </Link>
              </li>

              {/* Admin Login
              <li className="nav-item" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <img
                  src="/admin.png"
                  alt="Admin"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <Link className="nav-link custom-link" to="login">
                  Admin login
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
