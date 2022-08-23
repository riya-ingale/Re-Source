import React from 'react';
import "../Css/resourcedetail.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";

export default function LabDetails() {
  return (
    <>
    <div className="pd-wrap">
      <div className="container">
        <div className="heading-section">
          <h2>Lab Details</h2>
        </div>
        <div className="row lab-row">
          {/* <div className="col-md-6">
           
          </div> */}
          <div className="col-md-12">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">Lab Name</div>
              </div>
              
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <div className='row'>
                      <div className='col-md-6'>
                          <ul className="list-bullets">
                              <li className="mb-2"><strong className='strlist'>Lab ID: </strong> 32</li>
                              <li className="mb-2"><strong className='strlist'>Lab Assistant: </strong> John Depp</li>
                              {/* <li className="mb-2"><strong>Specification: </strong>High Bandwidth</li> */}
                          </ul>
                      </div>
                      <div className='col-md-6'>
                          <ul className="list-bullets">
                              <li className="mb-2"><strong className='strlist'>Institute Name: </strong>VESIT</li>
                              <li className="mb-2"><strong className='strlist'>Support Staff: </strong>Some detail</li>
                              {/* <li className="mb-2"><strong></strong></li> */}
                          </ul>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <p className='heading res-cards'><h3 class="heading_name">Resources Available in this Lab</h3></p>
      <div className="row">
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

                <button className="btn-vr">Book Now</button>
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
                <button className="btn-vr">Book Now</button>
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

                <button className="btn-vr">Book Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center pagination-div">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={10} variant="outlined"  color="primary" />
        </div>
    </div>
  </>
  )
}
