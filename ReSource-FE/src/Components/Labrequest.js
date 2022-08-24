import React,{useState, useEffect} from 'react';
import "../Css/labreq.css";
import labimg from "../Images/home5.jpg"
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';


export default function Labrequest() {
    const [res,setRes] = useState();
    const [load,setLoad] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/institute/lab_requests/",{
            headers:{'Authorization':sessionStorage.getItem('token')}
          })
        .then(response => response.json())
        .then(body =>{
            setRes(body);
            console.log(body);
            setLoad(true);
        })
    },[])

    const handleAccept = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/lab_requests/", {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": sessionStorage.getItem('token') },
        body: JSON.stringify({"id":id,'status':1})
        })
        window.location.href ="/labrequest";
    }
    const handleReject = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/lab_requests/", {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization":sessionStorage.getItem('token') },
        body: JSON.stringify({"id":id,'status':-1})
        })
        window.location.href ="/labrequest";
    }
  return (
    <>
    { load&&res.status === 200?
    <div className='container lab-request'>
    <div className="row">
        {res.data.map((item)=>(

                <div className="col-lg-4">
                    <div className="card card-margin">
                        <img src={labimg} className="card-img-top" alt="..."/>
                        <div className="card-header no-border">
                            <h5 className="card-title">Lab Name: {item.name}</h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-title-wrapper">
                                    {/* <div className="widget-49-date-primary">
                                        <span className="widget-49-date-day">09</span>
                                        <span className="widget-49-date-month">apr</span>
                                    </div> */}
                                    <div className="widget-49-meeting-info">
                                        <span className="widget-49-pro-title">Institute Name: {item.institute_name}</span>
                                        <span className="widget-49-meeting-time">Time: {item.start_time}:00 to {item.end_time}:00 Hrs</span>
                                    </div>
                                </div>
                                
                                <div className="widget-49-meeting-action">
                                    <button onClick={event => handleAccept(event,item.id)} className="btn btn-primary lab-btns">Accept</button>
                                    <button onClick={event => handleReject(event,item.id)} className="btn btn-primary lab-btns">Reject</button>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>))}
            </div>
    </div>:<div></div>}
    </>
  )
}
