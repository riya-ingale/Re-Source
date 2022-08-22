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
  // useEffect(() =>{
  //   fetch("http://127.0.0.1:8000/institute/profile/"+sessionStorage.getItem('user_id')+'/'+sessionStorage.getItem('role_id'))
  //   .then(response=>response.json())
  //   .then(body=>
  //     {
  //       setRes(body);
  //       setLoader(true);
  //       console.log(body);
  //     })
  // },[])


// async function showRazorpay(e,id) {
//   const data = await fetch("http://127.0.0.1:8000/placeorder/payment/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({"order_id":id}),
//     // Instead of harding sent the order_id for which the button has been clicked
//   }).then((t) => t.json())
//   console.log(sessionStorage.getItem("user_id"))
//   console.log(data);

//   var options = {
//     "key": "rzp_test_DfplOiJGao9t7P",
//     "order_id": data.order_id,
//     "name": "Re-Source Resources", 
//     "description": "Test Transaction",
//     "entity": "order",
//     "amount": data.amount,
//     "amount_paid": data.amount_paid,
//     "amount_due": data.amount_due,
//     "currency": "INR",
//     "receipt": "receipt#1",
//     "offer_id": null,
//     "status": "created",
//     "attempts": 0,
//     "notes": [],
//     "created_at": 1582628071,
  
//     'callback_url': "http://127.0.0.1:8000/placeorder/handlerequest/",
//     prefill: {
//         name: "ABS",
//         email: "abs@gmail.com",
//         contact: "+919876543212"
//     },
//     theme: {
//         color: "#3399cc"
//     }
// };
//   const paymentObject = new window.Razorpay(options);
//   paymentObject.open();
// }

 
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
        <div className='col-md-4'>
        <div className="card profilecards slots">
            <div className="card__details ">
            <h3>Pending Payments</h3>
            <article class="account__profile">
              {/* <span class="">OrderID: { res.pending_orders[0].id }</span><br></br>
              <span class="">Cost: Rs { res.pending_orders[0].finalcost }</span><br></br> */}
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
              <span class=""><button className="btn-vr">Pay Now</button></span>
            </article>
    
            <article class="account__profile">
              <span class="">OrderID: qwertuxhrfcv</span><br></br>
              <span class="">Cost: Rs 3000</span><br></br>
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
              <span class=""><button className="btn-vr">Pay Now</button></span>
            </article>

            <article class="account__profile">
              <span class="">OrderID: qwertuxhrfcv</span><br></br>
              <span class="">Cost: Rs 3000</span><br></br>
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
              <span class=""><button className="btn-vr">Pay Now</button></span>
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
            <h3>Payments Done</h3>
            <article class="account__profile">
              <AddCircleOutlineRoundedIcon/>
              <span class="" style={{color: "green",float: "right"}}>Debit</span><br></br>
              <span class="">OrderID: qwertuxhrfcv</span><br></br>
              <span class="">Cost: Rs 3000</span><br></br>
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
            </article>

            <article class="account__profile">
              <RemoveCircleOutlineRoundedIcon  />
              <span class="" style={{color: "red",float: "right"}}>Credit</span><br></br>
              <span class="">OrderID: qwertuxhrfcv</span><br></br>
              <span class="">Cost: Rs 3000</span><br></br>
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
            
            </article>

            <article class="account__profile">
            <AddCircleOutlineRoundedIcon/>
              <span class="" style={{color: "green",float: "right"}}>Debit</span><br></br>
              <span class="">OrderID: qwertuxhrfcv</span><br></br>
              <span class="">Cost: Rs 3000</span><br></br>
              <span class="">Institute Name: Vidyalankar Institute Of Technology</span>
            </article>
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
