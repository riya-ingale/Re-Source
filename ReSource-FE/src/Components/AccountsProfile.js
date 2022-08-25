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

export default function AccountsProfile() {
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


async function showRazorpay(e,id) {
  const data = await fetch("http://127.0.0.1:8000/placeorder/payment/", {
    method: "POST",
    headers: { "Content-Type": "application/json", 'Authorization':sessionStorage.getItem('token') },
    body: JSON.stringify({"order_id":id}),
    // Instead of harding sent the order_id for which the button has been clicked
  }).then((t) => t.json())
  console.log(sessionStorage.getItem("user_id"))
  console.log(data);

  var options = {
    "key": "rzp_test_DfplOiJGao9t7P",
    "order_id": data.order_id,
    "name": "Re-Source Resources", 
    "description": "Test Transaction",
    "entity": "order",
    "amount": data.amount,
    "amount_paid": data.amount_paid,
    "amount_due": data.amount_due,
    "currency": "INR",
    "receipt": "receipt#1",
    "offer_id": null,
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1582628071,

    'callback_url': "http://127.0.0.1:8000/placeorder/handlerequest/",
    prefill: {
        name: "ABS",
        email: "abs@gmail.com",
        contact: "+919876543212"
    },
    theme: {
        color: "#3399cc"
    }
};
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}


  return (
    <>
    {loader && res.status === 200?
    <div>
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
                <h1 className="Profile-name">{res.workforce.name}</h1>
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
            <h3>Pending Payments</h3>
            {res.pending_orders.map((item,index)=>(
            <article class="account__profile">
              <span class="">OrderID: {item.id}</span><br></br>
              <span class="">Cost: Rs {item.finalcost}</span><br></br>
              <span class="">Selling Institute : {item.seller_institutename}</span>
              <span class=""><button className="btn-vr" onClick={event=>showRazorpay(event,item.id)}>Pay Now</button></span>
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
              <li className="mb-2"><strong className='strlist'>Department: </strong> Accounts</li>
              <li className="mb-2"><strong className='strlist'>Position: </strong> {res.workforce.position}</li>
              <li className="mb-2"><strong className='strlist'>Institute: </strong>{res.institute_data[0].name}</li>
              <li className="mb-2"><strong className='strlist'>Email: </strong>{res.workforce.email_id}</li>
              {res.workforce.phone_no?<li className="mb-2"><strong className='strlist'>Phone Number: </strong>{res.workforce.phone_no}</li>:<div></div>}
            </ul>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>Payments Done</h3>
            {res.bdata.map((item)=>(
            <article class="account__profile">
              <AddCircleOutlineRoundedIcon/>
              <span class="" style={{color: "green",float: "right"}}>Debit</span><br></br>
              <span class="">Payment ID: {item.razorpay_order_id}</span><br></br>
              <span class="">Cost: Rs {item.finalcost}</span><br></br>
              {/* <span class="">Payment Date: {item.datetime_of_payment.split('T')[0]}</span> */}
            </article>
            ))}

            {
            res.sdata.map((item)=>(
            <article class="account__profile">
              <RemoveCircleOutlineRoundedIcon  />
              <span class="" style={{color: "red",float: "right"}}>Credit</span><br></br>
              <span class="">OrderID: {item.tid}</span><br></br>
              <span class="">Cost: Rs {item.finalcost}</span><br></br>
              {/* <span class="">Payment Date: {item.datetime_of_payment}</span> */}
            </article>
             ))}
             
          
            </div>
            </div>
        </div>
      </div>
      </div>
      
      <p><br></br></p>
    </div>   
    <div></div>
    </div>
    :<div></div>}
    </>
  )
}