import React, { useState,useEffect } from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export default function UGCStaffProfile() {
  const [res,setRes] = useState();
  const[load,setLoad] = useState(false);
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/institute/profile/",{
      headers:{'Authorization':sessionStorage.getItem('token')}
    })
    .then(response=>response.json())
    .then(body=>
      {
        setRes(body);
        setLoad(true);
        console.log(body);
      })
  },[])
  return (
    <>
    {load && res.status===200?
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
                <h1 className="Profile-name"></h1>
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
            <h3>Remaining Payments</h3>
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>

            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
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
            <h3>Completed Payments</h3>
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="slottime">VIT <br/> Rs 2000</span>
            </article>
            </div>
            </div>
        </div>
      </div>
      </div>
      
    </div>   
    :<div></div>}
    </>
  )
}
