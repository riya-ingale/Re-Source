import React from 'react';
import "../Css/addWorkforce.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function AddWorkforce() {
  
  return (
    <>
    <div className="container form-container">
    <div className="title title-wf-form">Add Workforce</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your Full Name" required/>
          </div>
          
          <div className="input-box">
            <span className="details">Institute</span>
            <Dropdown className="dropdown dropdown-wf">
              <Dropdown.Toggle variant="light" id="dropdown-basic" ClassName="dropdownbtn">
                Select Institute
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item >
                  1
                </Dropdown.Item>
                <Dropdown.Item>
                 2
                </Dropdown.Item>
                <Dropdown.Item>
                  4
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </div>
          <div className="input-box">
             <span className="details">Position</span>
             <Dropdown className="dropdown dropdown-wf">
              <Dropdown.Toggle variant="light" id="dropdown-basic" ClassName="dropdownbtn">
                Select Position
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item >
                  Accountant
                </Dropdown.Item>
                <Dropdown.Item>
                 Teacher
                </Dropdown.Item>
                <Dropdown.Item>
                  Lab Assistant
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>
          <div className="input-box">
            <span className="details">ID Number</span>
            <input type="number" placeholder="Enter your ID Number" required/>
          </div>
          <div className="input-box">
            <span className="details">Contact Number</span>
            <input type="number" placeholder="Enter your Contact Number" required/>
          </div>
          
          <div className="input-box">
            <span className="details">ID card</span>
            <input type="file" className="input-file" placeholder="Registration Number" required/>
          </div>
          
        </div>
        <div className="btn btn-primary btn-wf" type="submit">
           Register
        </div>
        
      </form>
    </div>
  </div>
    </>
  )
}
