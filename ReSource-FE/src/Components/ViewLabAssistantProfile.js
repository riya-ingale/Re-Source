import React from 'react';
import "../Css/intituteprofile.css";
import "../Css/wfprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import EditIcon from '@mui/icons-material/Edit';

export default function ViewLabAssistantProfile() {
  return (
    <>
    <div className='container profile-container'>
      <div className='bg-box'>
      </div>
      <div className='blur-bg'>
        <div className='inner-blur MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-b5x8ma'>
          <div className='row row-blur'>
            <div className='col-md-2 '>
              <div className='profile-pic-div'>
                <img src={img} className='profile-image' alt='profile'></img>
              </div>
            </div>
            <div className='col-md-10'>
              <p>
                <h1 className="Profile-name">Name</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container details-container'>
      <div className='row'>
        <div className='col-md-4'>
        <div className="card profilecards slots">
            <div className="card__details ">
            <h3>Today's Booked Slots</h3>
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>

            <article class="leaderboard__profile">
            <span class="slottime">9:00-11:00</span>
            </article>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards">
            <div className="card__details">
            <h3>Profile details <Link to="/"><EditIcon></EditIcon></Link></h3>
            <ul className="list-bullets detail-list">
              <li className="mb-2"><strong className='strlist'>Department: </strong> Accounts</li>
              <li className="mb-2"><strong className='strlist'>Position: </strong> Assistant</li>
              <li className="mb-2"><strong className='strlist'>Institute: </strong>VIT</li>
              <li className="mb-2"><strong className='strlist'>Email: </strong>421202</li>
              <li className="mb-2"><strong className='strlist'>Phone Number: </strong>421202324</li>
              <li className="mb-2"><strong className='strlist'>Ammount of Resources: </strong>421</li>
              <li className="mb-2"><strong className='strlist'>Ammount of labs: </strong>24</li>
            </ul>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>Tommorow's Booked Slots</h3>
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">9:00-11:00</span>
            </article>
            </div>
            </div>
        </div>
      </div>
      </div>
      {/* Resources */}
      <p className='heading res-cards'><h3 class="heading_name">Resources Managed By You</h3></p>
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
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={10} variant="outlined"  color="primary" />
        </div>
        {/* Labs  */}
        <p className='heading'><h3 class="heading_name">Labs Managed By You</h3></p>
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
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={10} variant="outlined"  color="primary" />
        </div>
    </div>   
    </>
  )
}
