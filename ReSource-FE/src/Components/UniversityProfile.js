import React, {useState,useEffect} from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'; 

export default function UniversityProfile() {
  const [loader,setLoader] = useState(false);
  const[res,setRes] = useState();
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/institute/profile/"+sessionStorage.getItem('user_id')+"/"+sessionStorage.getItem('role_id'))
    .then(response=>response.json())
    .then(body=>
      {
        setRes(body);
        setLoader(true);
        console.log(body);
      })
  },[])
  const pendingreq = (e) =>{
    window.location.href = "/intituterequest"
  }
  return (
    <>
    {loader?
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
                <h1 className="Profile-name">{res.data.name}</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container details-container'>
      <div className='row'>
        <div className='col-md-6'>
        <div className="card profilecards">
            <div className="card__details">
            <h3>Profile details <Link to="/"><EditIcon></EditIcon></Link></h3>
            <ul className="list-bullets detail-list">
              <li className="mb-2"><strong className='strlist'>City: </strong> Pune</li>
              <li className="mb-2"><strong className='strlist'>State: </strong> Mahrashtra</li>
              <li className="mb-2"><strong className='strlist'>Pincode: </strong>421202</li>
              <li className="mb-2"><strong className='strlist'>Email: </strong>421202</li>
              <li className="mb-2"><strong className='strlist'>Phone Number: </strong>421202324</li>
              <li className="mb-2"><strong className='strlist'>Ammount of Resources: </strong>421</li>
              <li className="mb-2"><strong className='strlist'>Ammount of labs: </strong>24</li>
              <li className="mb-2"><strong className='strlist'>Ammount of Institutes: </strong>20</li>
            </ul>
            </div>
            </div>
        </div>
        
        <div className='col-md-6'>
        <button className='btn btn-primary addstaffbtn' onClick={pendingreq}>Pending Institutes<AddCircleRoundedIcon></AddCircleRoundedIcon></button>
        <h3>Approved Institutes</h3>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 1</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 2</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 3</span>
            </article>
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 4</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 5</span>
            </article>
    
            <article class="leaderboard__profile">
              <span class="leaderboard__name">Institute 6</span>
            </article>
            </div>
            </div>
        </div>
      </div>
      </div>
      
    </div>   :<div></div>}
    </>
  )
}
