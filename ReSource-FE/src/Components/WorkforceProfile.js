import React,{useState,useEffect} from 'react';
import "../Css/intituteprofile.css";
import "../Css/wfprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import EditIcon from '@mui/icons-material/Edit';

export default function WorkforceProfile() {
  const [res,setRes] = useState();
  const [load,setLoad] = useState(false);
  const [r_id,setR_id] = useState(1);
  const [l_id,setL_id] = useState(1);
 
  useEffect(()=>{
    if (load == false){ 
    fetch("http://127.0.0.1:8000/institute/workforce_profile/1/1",{
        headers:{'Authorization':sessionStorage.getItem('token')}
      })
    .then(response => response.json())
    .then(body =>{
        // setR_page();
        // setL_page(); 
        setRes(body);
        console.log(body);
        setLoad(true);
    
    })
  }
},[])
  
const handleLab = (e,p) =>{
  setL_id(p);
  fetch("http://127.0.0.1:8000/institute/workforce_profile/"+r_id+"/"+p
  ,{
    headers:{'Authorization':sessionStorage.getItem('token')}
  })
  .then(response=>response.json())
  .then(body=>
    {
      setRes(body);
      setLoad(true);
      console.log(body);
    })
}

const handleRes = (e,p) =>{
  setR_id(p);
  fetch("http://127.0.0.1:8000/institute/workforce_profile/"+p+"/"+l_id
  ,{
    headers:{'Authorization':sessionStorage.getItem('token')}
  })
  .then(response=>response.json())
  .then(body=>
    {
      setRes(body);
      setLoad(true);
      console.log(body);
    })
}

const handleadd = (e,id) =>{
  sessionStorage.setItem('role_id',id)
  window.location.href = '/addres'
}
  return (
    <>
    {load && res.status ===200?
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
                <h1 className="Profile-name">{res.workforce_data.name}</h1>
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
            {res.today_slots.map((item,index)=>(
    
    <article class="leaderboard__profile">
      <span class="slottime">Timings {item.start_time}:00 - {item.end_time}:00 Hrs.</span>

      <span class="slottime">Lab Name:{res.today_names[index].lab_name}</span>
      <span class="slottime">Resource: {res.today_names[index].resource_name}</span>
    </article>
    ))}
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards">
            <div className="card__details">
            <h3>Profile details <Link to="/"><EditIcon></EditIcon></Link></h3>
            <ul className="list-bullets detail-list">
            {res.workforce_data.position?<li className="mb-2"><strong className='strlist'>Position: </strong> {res.workforce_data.position}</li>:<div></div>}
            {res.workforce_data.state?<li className="mb-2"><strong className='strlist'>State: </strong>{res.workforce_data.state}</li>:<div></div>}
            {res.workforce_data.pincode?<li className="mb-2"><strong className='strlist'>Pincode: </strong>{res.workforce_data.pincode}</li>:<div></div>}
              <li className="mb-2"><strong className='strlist'>Email: </strong>{res.workforce_data.email_id}</li>
            {res.workforce_data.phone_no?<li className="mb-2"><strong className='strlist'>Phone Number: </strong>{res.workforce_data.phone_no}</li>:<div></div>}
              <li className="mb-2"><strong className='strlist'>Amount of Resources: </strong>{res.total_resource_count}</li>
              <li className="mb-2"><strong className='strlist'>Amount of labs: </strong>{res.total_lab_count}</li>
            </ul>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>Tommorow's Booked Slots</h3>
            {res.tomorrow_slots.map((item,index)=>(
    
            <article class="leaderboard__profile">
              <span class="slottime">Timings {item.start_time}:00 - {item.end_time}:00 Hrs.</span>

              <span class="slottime">Lab Name:{res.tomrrow_names[index].lab_name}</span>
              <span class="slottime">Resource: {res.tomrrow_names[index].resource_name}</span>
            </article>
            ))}
            </div>
            </div>
        </div>
      </div>
      </div>
      {/* Resources */}
      <p className='heading res-cards'><h3 class="heading_name">Resources Managed By You</h3></p>
      <div className="row">
          {res.resource_data.map((item,index)=>(
          <div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={require("../temp_images/temp"+String(index+1)+".jpeg")} className="imgres" alt="Equipment Name" />

              {/* <!-- A div with card__details class to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                
                <div className="name">Equipment Name: {item.name}</div>
                {/* <span className="discount">Partially Available</span> */}
                <div className="">
                  <ul>
                    {/* <li className="lires boldline">Availability: Partially Available</li> */}
                    <li className="lires">Cost: {item.cost} Rs/hour</li>
                    <li className="lires">Subject: {item.subject}</li>
                    <li className="lires">Quantity: {item.quantity}</li>
                  </ul>
                </div>
                <a href={'/resdetail/'+item.id}>
                <button className="btn-vr">Book Now</button></a>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={res.total_resource_pages} variant="outlined" onChange={handleRes} color="primary" />
        </div>
        {/* Labs  */}
        <p className='heading'><h3 class="heading_name">Labs Managed By You</h3></p>
        <div className="row">
          {res.lab_data.map((item,index)=>(
          <div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={phy} className="imgres" alt="Equipment Name" />

              {/* <!-- A div with card__details class to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                <div className="name">Lab Name: {item.name}</div>
                {/* <span className="discount">Partially Available</span> */}
                <div className="">
                  <ul>
                    {/* <li className="lires boldline">Availability: Partially Available</li> */}
                    <li className="lires">Timings: {item.start_time}:00 - {item.end_time}:00 Hrs</li>
                    {/* <li className="lires">Institute Name: {res.institute_data.name}</li> */}
                    {/* <li className="lires">Capacity: 100</li> */}
                  </ul>
                </div>
                {/* <a href={'/labdetail/'+item.id}> */}
                <button className="btn-vr" onClick={event =>handleadd(event,item.id)}>Add resource</button>

                {/* </a> */}
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={res.total_lab_pages} variant="outlined" onChange={handleLab} color="primary" />
        </div>
    </div>   
    :<div></div>}
    </>
  )
}
