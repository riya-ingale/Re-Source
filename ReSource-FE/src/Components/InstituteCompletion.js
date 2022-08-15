import React from 'react';
import "../Css/instiform.css"

export default function InstituteCompletion() {
  return (
    <>
     <div className="container form-container">
    <div className="title">Hello Institute</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">University Name</span>
            <input type="text" placeholder="Affliated University" required/>
          </div>
          
          <div className="input-box">
            <span className="details">State</span>
            <input type="text" placeholder="Enter your State" required/>
          </div>
          <div className="input-box">
            <span className="details">City</span>
            <input type="text" placeholder="Enter your City" required/>
          </div>
          
          <div className="input-box">
            <span className="details">Pincode</span>
            <input type="number" placeholder="Enter your Pincode" required/>
          </div>
          <div className="input-box">
            <span className="details">Contact Number</span>
            <input type="number" placeholder="Enter your Contact number" required/>
          </div>
          
          <div className="input-box">
            <span className="details">Registration Number</span>
            <input type="number" placeholder="Registration Number" required/>
          </div>
          <div className="input-box">
            <span className="details">Accredition</span>
            <input type="file" placeholder="" required />
          </div>
          <div className="input-box">
            <span className="details">SOP</span>
            <input type="file" placeholder="" required />
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
