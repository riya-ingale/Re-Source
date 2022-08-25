import React,{useState, useEffect} from "react";
import "../Css/viewres.css";
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";

export default function ResourceApproval() {
  const [res,setRes] = useState();
    const [load,setLoad] = useState(false);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/institute/resource_addrequest/",{
          headers:{'Authorization':sessionStorage.getItem('token')}
        })
        .then(response => response.json())
        .then(body =>{
            setRes(body);
            console.log(body);
            setLoad(true);
            if(body.status == 200 && body.data.length == 0)
            {
              console.log("No New Data")
            }
        })
    },[])

    const handleAccept = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/resource_addrequest/", {
        method: 'POST',
        headers: { "Content-Type": "application/json", 'Authorization': sessionStorage.getItem('token')},
        body: JSON.stringify({"id":id,'status':1})
        })
        window.location.href ="/resource_addrequest";
    }
    const handleReject = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/resource_addrequest/", {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization":sessionStorage.getItem('token') },
        body: JSON.stringify({"id":id,'status':-1})
        })
        window.location.href ="/resource_addrequest";
    }
  return (
    <>
    {load?
    <div className="containner c-view-res">
      <h3 className="heading">Approval Requests - Resources</h3>
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
              <div className="name">Equipment Name :{item.name}</div>
              {/* <span class="discount">80</span> */}
              <div className="">
                <ul>
                  <li className="lires boldline">Quantity: {item.quantity}</li>
                  <li className="lires">Cost: {item.cost} Rs/hour</li>
                  <li className="lires">Lab Name: {item.lab_name}</li>
                  <li className="lires">Lab Assistant: {item.workforce}</li>
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                    <button className="btn-vr" onClick={event =>handleAccept(event,item.id)}>Accept</button>
                </div>
                <div className='col-md-6'>
                    <button className="btn-vr" onClick={event =>handleReject(event,item.id)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>:<div></div>}
  </>
  )
}
