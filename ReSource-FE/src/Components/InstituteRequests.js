import React,{useState,useEffect} from 'react';
import "../Css/instituteRequest.css"
import { Link } from "react-router-dom";


export default function InstituteRequests() {

    const [res,setRes] = useState();
    const [load,setLoad] = useState(false);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/institute/institute_requests/"+sessionStorage.getItem('user_id'))
        .then(response => response.json())
        .then(body =>{
            setRes(body);
            console.log(body);
            setLoad(true);
        })
    },[])

    const handleAccept = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/institute_requests/"+sessionStorage.getItem('user_id'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id":id,'status':1})
        })
        window.location.href ="/intituterequest";
    }
    const handleReject = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/institute_requests/"+sessionStorage.getItem('user_id'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id":id,'status':-1})
        })
        window.location.href ="/intituterequest";
    }
  return (
    <>
    <div className='container institute-request-container'>
        <div className='row'>
            <div className='col-md-4'>
            <div class="institute-request-card" href="#">
                <h3>Institute Name</h3>
                <div class="small">
                <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                                <li className="mb-2"><strong className='strlist'>University: </strong> David Fernandez</li>
                                <li className="mb-2"><strong className='strlist'>Phone: </strong> 9778365432</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>david2445@gmail.com</li>
                                <li className="mb-2"><strong className='strlist'>City: </strong>david2445@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Reject</button>
                        </div>
                    </div>
                </div>
             
            </div>
            </div>
            <div className='col-md-4'>
            <div class="institute-request-card" href="#">
                <h3>Institute Name</h3>
                <div class="small">
                <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                                <li className="mb-2"><strong className='strlist'>University: </strong> David Fernandez</li>
                                <li className="mb-2"><strong className='strlist'>Phone: </strong> 9778365432</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>david2445@gmail.com</li>
                                <li className="mb-2"><strong className='strlist'>City: </strong>david2445@gmail.com</li>
                                <li className="mb-2"><strong className='strlist'>Accrediation :</strong><a href="ReSource-FE/src/temp_accredition/sample_accrediation.pdf" download>Download</a></li>

                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Reject</button>
                        </div>
                    </div>
                </div>
             
            </div>
            </div>
            <div className='col-md-4'>
            <div class="institute-request-card" href="#">
                <h3>Institute Name</h3>
                <div class="small">
                <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                                <li className="mb-2"><strong className='strlist'>University: </strong> David Fernandez</li>
                                <li className="mb-2"><strong className='strlist'>Phone: </strong> 9778365432</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>david2445@gmail.com</li>
                                <li className="mb-2"><strong className='strlist'>City: </strong>david2445@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn">Reject</button>
                        </div>
                    </div>
                </div>
             
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
