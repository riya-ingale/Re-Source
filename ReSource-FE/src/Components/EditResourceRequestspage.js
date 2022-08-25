import React from "react";
import "../Css/viewres.css";
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";

export default function EditResourceRequestspage() {
  return (
    <>
    <div className="containner c-view-res">
      <div className="row">
      <h3 className="heading">Approval Requests - Edited Resources</h3>
        <div className="col-md-4 colvr">
          <div className="card rescard">
            <img src={chem} className="imgres" alt="Equipment Name" />

            {/* <!-- A div with card__details  to hold the details in the card  --> */}
            <div className="card__details">
              {/* <!-- Span with tag class for the tag --> */}
              {/* <span className="tag">Nature</span>

              <span className="tag">Lake</span> */}

              {/* <!-- A div with name class for the name of the card --> */}
              <div className="name">Equipment Name</div>
              {/* <span class="discount">Partially Available</span> */}

              <div className="">
                <ul>
                  <li className="lires boldline">Availability: Partially Available</li>
                  <li className="lires">Cost: 1000 Rs/hour</li>
                  <li className="lires">Institute Name: VIT,Mumbai</li>
                  <li className="lires">Capacity: 100</li>
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                    <button className="btn-vr">Accept</button>
                </div>
                <div className='col-md-6'>
                    <button className="btn-vr">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 colvr">
          <div className="card rescard">
            <img src={bio} className="imgres" alt="Equipment Name" />

            {/* <!-- A div with card__details class to hold the details in the card  --> */}
            <div className="card__details">
              {/* <!-- Span with tag class for the tag --> */}
              {/* <span className="tag">Nature</span>

              <span className="tag">Lake</span> */}

              {/* <!-- A div with name class for the name of the card --> */}
              <div className="name">Equipment Name</div>

              <div className="">
                <ul>
                  <li className="lires boldline">Availability: Partially Available</li>
                  <li className="lires">Cost: 1000 Rs/hour</li>
                  <li className="lires">Institute Name: VIT,Mumbai</li>
                  <li className="lires">Capacity: 100</li>
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                    <button className="btn-vr">Accept</button>
                </div>
                <div className='col-md-6'>
                    <button className="btn-vr">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 colvr">
          <div className="card rescard">
            <img src={phy} className="imgres" alt="Equipment Name" />

            {/* <!-- A div with card__details class to hold the details in the card  --> */}
            <div className="card__details">
              {/* <!-- Span with tag class for the tag --> */}
              {/* <span className="tag">Nature</span>

              <span className="tag">Lake</span> */}

              {/* <!-- A div with name class for the name of the card --> */}
              <div className="name">Equipment Name</div>
              {/* <span class="discount">Partially Available</span> */}
              <div className="">
                <ul>
                  <li className="lires boldline">Availability: Partially Available</li>
                  <li className="lires">Cost: 1000 Rs/hour</li>
                  <li className="lires">Institute Name: VIT,Mumbai</li>
                  <li className="lires">Capacity: 100</li>
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                    <button className="btn-vr">Accept</button>
                </div>
                <div className='col-md-6'>
                    <button className="btn-vr">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
