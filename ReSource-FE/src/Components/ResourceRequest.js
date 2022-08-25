import React,{useState,useEffect} from "react";
import "../Css/viewres.css";
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function ResourceRequest() {
  const [res,setRes] = useState();
  const [load,setLoad] = useState(false);
  const location = useLocation();
  const type = location.pathname.split('/')[1]
  console.log(type)
  useEffect(()=>{
    if(type === 'resource_request'){
      fetch("http://127.0.0.1:8000/institute/resource_rentapproval/",{
        headers:{'Authorization':sessionStorage.getItem('token')}
      })
      .then(response => response.json())
      .then(body =>{
          setRes(body);
          console.log(body);
          setLoad(true);
      })
    }
      else if(type === 'edit_req'){
        fetch("http://127.0.0.1:8000/institute/resource_editrequests/",{
          headers:{'Authorization':sessionStorage.getItem('token')}
        })
      .then(response => response.json())
      .then(body =>{
          setRes(body);
          console.log(body);
          setLoad(true);
      })
      }
  },[type])

  const handleAccept = (e,id) =>{
    if(type === 'resource_request'){
      console.log(id);
      fetch("http://127.0.0.1:8000/institute/resource_rentapproval/", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": sessionStorage.getItem('token') },
      body: JSON.stringify({"id":id,'status':1})
      })
      window.location.href ="/resource_request";
    }
    else if(type === 'edit_req'){
      console.log(id);
      fetch("http://127.0.0.1:8000/institute/resource_editrequests/", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": sessionStorage.getItem('token') },
      body: JSON.stringify({"resource_id":id,'status':1})
      })
      window.location.href ="/edit_req";
    }
  }
  const handleReject = (e,id) =>{
    if(type === 'resource_request'){
      console.log(id);
      fetch("http://127.0.0.1:8000/institute/resource_rentapproval/", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization":sessionStorage.getItem('token') },
      body: JSON.stringify({"id":id,'status':-1})
      })
      window.location.href ="/resource_request";
    } 
    else if(type === 'edit_req'){
      console.log(id);
      fetch("http://127.0.0.1:8000/institute/resource_editrequests/", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization":sessionStorage.getItem('token') },
      body: JSON.stringify({'resource_id':id,'status':-1})
      })
      window.location.href ="/edit_req";
    }
  }

  return (
    <>
    {load && type === 'resource_request'&& res.status === 200?
    <div className="containner c-view-res">
      <div className="row">
      
        {res.resource_data.map((item,index) =>(
        <div className="col-md-4 colvr">
          <div className="card rescard">
            <img src={require("../temp_images/temp"+String(index+1)+".jpeg")} className="imgres" alt="Equipment Name" />

            {/* <!-- A div with card__details class to hold the details in the card  --> */}
            <div className="card__details">
              {/* <!-- Span with tag class for the tag --> */}
              {/* <span className="tag">Nature</span>

              <span className="tag">Lake</span> */}

              {/* <!-- A div with name class for the name of the card --> */}
              <div className="name">Equipment Name: {res.names_images[index].resource}</div>
              {/* <span class="discount">Partially Available</span> */}
              <div className="">
                <ul>
                  <li className="lires boldline">Date: {item.date}</li>
                  <li className="lires">Cost: {item.cost} Rs/hour</li>
                  <li className="lires">Buyer Institute: {res.names_images[index].buyer_institute}</li>
                  <li className="lires">Slot: {item.start_time} - {item.end_time}</li>
                  <li className="lires">Units Request: {item.units}</li>
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                    <button className="btn-vr" onClick={event=>handleAccept(event,item.c_id)}>Accept</button>
                </div>
                <div className='col-md-6'>
                    <button className="btn-vr" onClick={event=>handleReject(event,item.c_id)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    :<div></div>}
    {load && type === 'edit_req'&& res.status === 200?
    <div className="containner c-view-res">
      <h3 className="heading">Approval Requests - Edited Resources</h3>
    <div className="row">
      {res.data.map((item,index) =>(
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
            {/* <span class="discount">Partially Available</span> */}
            <div className="">
              <ul>
                <li className="lires boldline">Dimensions: {item.dimension}</li>
                <li className="lires">Cost: {item.cost} Rs/hour</li>
                <li className="lires">Units : {item.quantity}</li>
              </ul>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                  <button className="btn-vr" onClick={event=>handleAccept(event,item.id)}>Accept</button>
              </div>
              <div className='col-md-6'>
                  <button className="btn-vr" onClick={event=>handleReject(event,item.id)}>Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  </div>
    :<div></div>}
  </>
  )
}
