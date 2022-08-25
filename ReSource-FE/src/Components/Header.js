import React,{useState, useEffect} from "react";
import "../Css/header.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from 'react-router-dom';
import logo from "../Images/logo.png"

export default function Header() {

  const [res,setRes] = useState();
  const [load,setLoad] = useState(false);
  const role_id = Number(sessionStorage.getItem('role_id'))

  return (
    <>
      {/* <!-- Navigation --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="logo" src={logo}/>
          </Link>
          <Link className="navbar-brand portalname" to="/">
            Re-Source
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
          {role_id === 1?
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Home
                </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/ugcProfile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
                <button className="btn logoutbtn">
                  {" "}
                  <i class="fa fa-sign-out" aria-hidden="true"></i>  LogOut
                </button>
              </li>
              </ul>
            :<div></div>}
          {role_id === 2?
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Home
                </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="#">
                Profile
              </Link>
            </li>
            <li className="nav-item">
                <button className="btn logoutbtn">
                  {" "}
                  <i class="fa fa-sign-out" aria-hidden="true"></i>  LogOut
                </button>
              </li>
              </ul>
            :<div></div>}
          {role_id === 3?
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Home
                </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/instituteProfile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
                <button className="btn logoutbtn">
                  {" "}
                  <i class="fa fa-sign-out" aria-hidden="true"></i>  LogOut
                </button>
              </li>
              
              {/* <li className="nav-item">
                <Link className="nav-link" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Cart
                </Link>
              </li>
              <li className="nav-item">             
                <Link className="nav-link service-dropdown" to="#">
                  <Dropdown className="servicebtn">
                    <Dropdown.Toggle variant="light" id="dropdown-basic" ClassName="dropdownbtn">
                      Services
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item to="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item to="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item to="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn logoutbtn">
                  {" "}
                  <i class="fa fa-sign-out" aria-hidden="true"></i>  LogOut
                </button>
              </li> */}
            </ul>
            :<div></div>}

            {role_id === 4?
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Home
                </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/wfprofile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewres">
                All Resources
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
                <button className="btn logoutbtn">
                  {" "}
                  <i class="fa fa-sign-out" aria-hidden="true"></i>  LogOut
                </button>
              </li>
              </ul>
            :<div></div>}
            
          </div>
        </div>
      </nav>
    </>
  );
}
