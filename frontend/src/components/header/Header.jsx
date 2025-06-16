import React from 'react'
import { Link } from 'react-router-dom'
import '../../header.css';

export const Header = () => {
  const Welcome = ({ name }) => {
    return <div> Welcome to Vishakha Admin portal, {name}!</div>;
  };
  return (
    <>
      <div className="header-container">
        <img src="/images.png" alt="Vishakha Polyfab" className="logo" />
        <div className="marquee-wrapper">
          <div className="welcome-text">
            <Welcome name="Devesh" />
          </div>
        </div>
      </div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{}}>
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
              <li className="nav-item">
                <img
                  src="/help-desk_4939493.png"
                  alt="Helpdesk"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link active custom-link" to="Dashboard">
                  Helpdesk
                </Link>
              </li>

              <li className="nav-item">
                <img
                  src="/meeting-room_1693663.png"
                  alt="Helpdesk"
                  style={{ width: '40px', height: '40px', marginLeft: '45px' }}
                />
                <Link className="nav-link custom-link" to="about">
                  Conference Room
                </Link>
              </li>

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="contactlist">
                      Contactlist
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
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
              </li> */}
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

              <li className="nav-item">
                <img
                  src="/book_2682678.png"
                  alt="Cab book"
                  style={{ width: '40px', height: '40px', marginLeft: '15px' }}
                />
                <Link className="nav-link custom-link" to="contact">
                  Cab Book
                </Link>
              </li>

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

              <li className="nav-item">
                <img
                  src="/admin.png"
                  alt="Admin"
                  style={{ width: '40px', height: '40px',marginLeft:'630px'}}
                />
                <Link className="nav-link custom-link" to="admin" style={{marginLeft:'595px'}}>
                  Admin login
                </Link>
              </li>

            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};
