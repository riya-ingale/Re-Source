import React from 'react';
import "../Css/addlab.css"

export default function Addlab() {
  return (
    <>
    <div className="container form-container">
    <div className="title">Add Labs Here</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Lab Name</span>
            <input type="text" placeholder="Enter Room Number" required/>
          </div>
          
          <div className="input-box">
            <span className="details">Start Time</span>
            <input type="time" placeholder="" required/>
          </div>
          <div className="input-box">
            <span className="details">End Time</span>
            <input type="time" placeholder="" required/>
          </div>
          
          
        </div>
        <div className="button">
          <input type="submit" value="Register"/>
        </div>
        
      </form>
    </div>
  </div>
    </>
  )
}
