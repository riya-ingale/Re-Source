import React,{useState,useEffect} from 'react';
import "../Css/intituteprofile.css";
import "../Css/wfprofile.css";
import "../Css/accounts_profile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'; 
import useRazorpay from "react-razorpay";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function ViewAccountsProfile() {
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
                <h1 className="Profile-name">Accountant Name</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container details-container'>
      <div className='row'>
        <div className='col-md-12 d-flex justify-content-center' >
        <div className="card profilecards" style={{height: "300px"}}>
            <div className="card__details">
            <div className='d-flex justify-content-center'>
            <h3 style={{alignText: "center"}}>Profile details</h3>
            </div>
            <div className='d-flex justify-content-center'>
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
        </div>
      </div>
      </div>
      <p><br></br></p>
    </div>   
    <div></div>
    </>
  )
}
