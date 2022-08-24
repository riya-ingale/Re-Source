import React,{useState, useEffect} from 'react';
import "../Css/wfreq.css";
import profile from "../Images/user-account.png";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';


export default function WorkforceRequest() {

    const [res,setRes] = useState();
    const [load,setLoad] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/institute/workforce_requests/",{
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
        fetch("http://127.0.0.1:8000/institute/workforce_requests/", {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization":sessionStorage.getItem('token') },
        body: JSON.stringify({"workforce_id":id,'status':1})
        })
        window.location.href ="/wfrequest";
    }
    const handleReject = (e,id) =>{
        fetch("http://127.0.0.1:8000/institute/workforce_requests/", {
            method: 'POST',
            headers: { "Content-Type": "application/json" , "Authorization":sessionStorage.getItem('token') },
            body: JSON.stringify({"workforce_id":id,'status':-1})
            })
            window.location.href ="/wfrequest";
        
    }
  return (
    <>
    {load && res.status===200?
    <div className='row wfreq-container'>
        {res.data.map((item)=>(
        <div className='col-md-6 sec'>
            <div className="blog_post">
                <div className="img_pod">
                    <img src={profile} className="profile" alt="random image"/>
                </div>
                <div className="container_copy">
                    <h3 className='Department'>Position</h3>
                    <h1 className='wf-position'>{item.position}</h1>
                    <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                            {item.name ?<li className="mb-2"><strong className='strlist'>Name: </strong>{item.name}</li>:<div></div>}
                            {item.phone_no?<li className="mb-2"><strong className='strlist'>Phone: </strong>{item.phone_no}</li>:<div></div>}
                                <li className="mb-2"><strong className='strlist'>Email: </strong>{item.email_id}</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>{item.institute_name}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn_primary" onClick={event => handleAccept(event,item.id)}>Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn_primary" onClick={event => handleReject(event,item.id)}>Reject</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        ))}
    </div>:
    <div></div>
    }
    </>
  )
}
