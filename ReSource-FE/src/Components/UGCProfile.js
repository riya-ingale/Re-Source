import React,{useState,useEffect} from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'; 

export default function UGCProfile() {
  const [loader,setLoader] = useState(false);
  const[res,setRes] = useState();
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/institute/profile/",{
      headers:{'Authorization':sessionStorage.getItem('token')}
    })
    .then(response=>response.json())
    .then(body=>
      {
        setRes(body);
        setLoader(true);
        console.log(body);
      })
  },[])
  const pendingreq = (e) =>{
    window.location.href = "/univrequest"
  }
  const addstaff = (e) =>{
    window.location.href = "/ugcstaffform"
  }
  return (
    <>
    {loader&&res.status===200?
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
     <div className='col-md-3'>
     <div className="card profilecards">
         <div className="card__details">
         <h3>Profile details <Link to="/"><EditIcon></EditIcon></Link></h3>
         <ul className="list-bullets detail-list">
         {res.data.city?<li className="mb-2"><strong className='strlist'>City: </strong> {res.data.city}</li>:<div></div>}
         {res.data.state?<li className="mb-2"><strong className='strlist'>State: </strong>{res.data.state}</li>:<div></div>}
         {res.data.pincode?<li className="mb-2"><strong className='strlist'>Pincode: </strong>{res.data.pincode}</li>:<div></div>}
           <li className="mb-2"><strong className='strlist'>Email: </strong>{res.data.email}</li>
           {res.data.phone_no?<li className="mb-2"><strong className='strlist'>Phone Number: </strong>{res.data.phone_no}</li>:<div></div>}
           {/* <li className="mb-2"><strong className='strlist'>Ammount of Institutes: </strong>{res.institute_data.length}</li> */}
         </ul>
         </div>
         </div>
     </div>
     <div className='col-md-4'>
     {/* button className='btn btn-primary addstaffbtn' onClick={pendingreq}>Add new Staff<AddCircleRoundedIcon></AddCircleRoundedIcon></button> */}
     <h3>Approved Universities</h3>
     <div className="card profilecards workforce-list">
         <div className="card__details">
           { res.universities.map((item,index)=>(
             <a href={'/viewUniversityProfile/'+item.id}>
         <article class="leaderboard__profile">
           <span class="leaderboard__name">{item.name}</span>
         </article>
         </a>
           ))}
         </div>
         </div>
     </div>
     
     <div className='col-md-5'>
     <button className='btn btn-primary' onClick={pendingreq}>Pending Universities<AddCircleRoundedIcon></AddCircleRoundedIcon></button>
     <button className='btn btn-primary addstaffbtn' onClick={addstaff}>Add new Staff<AddCircleRoundedIcon></AddCircleRoundedIcon></button>
     <br/>
     <br/>
     <h3>Approved UGC Staffs</h3>
     <div className="card profilecards workforce-list">
         <div className="card__details">
           { res.ugc_staff.map((item,index)=>(
            <a href={'/ugcStaffProfile/'+item.id}>
         <article class="leaderboard__profile">
           <span class="leaderboard__name">{item.name}</span>
           <span  class="leaderboard__name">{item.position}</span>
         </article>
         </a>
           ))}
         </div>
         </div>
     </div>
   </div>
   </div>
   
 </div>   :<div></div>}  
    </>
  )
}
