import React,{useState,useEffect} from 'react';
import "../Css/instituteRequest.css"
import { Link } from "react-router-dom";
import axios from 'axios';


export default function InstituteRequests() {

    var fileDownload = require('js-file-download');
    const [res,setRes] = useState();
    const [load,setLoad] = useState(false);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/institute/institute_requests/"
        ,{
            headers:{'Authorization':sessionStorage.getItem('token')}
        })
        .then(response => response.json())
        .then(body =>{
            setRes(body);
            console.log(body);
            setLoad(true);
        })
    },[])

    const handlePDFDownload = (e,filename) => {
        const myfile =  filename.split('/')
        console.log(myfile[3])
        axios.get("http://127.0.0.1:8000/institute/download/"+"acc/"+myfile[3], { 
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, 'accrediation.pdf');
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
}

const handlesopDownload = (e,filename) => {
    const myfile =  filename.split('/')
    console.log(myfile[3])
    axios.get("http://127.0.0.1:8000/institute/download/"+"sop/"+myfile[3], { 
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, 'sop.pdf');
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

    const handleAccept = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/institute_requests/", {
        method: 'POST',
        headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token') },
        body: JSON.stringify({"institute_id":id,'status':1})
        })
        window.location.href ="/intituterequest";
    }
    const handleReject = (e,id) =>{
        console.log(id);
        fetch("http://127.0.0.1:8000/institute/institute_requests/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" ,'Authorization':sessionStorage.getItem('token')},
        body: JSON.stringify({"institute_id":id,'status':-1})
        })
        window.location.href ="/intituterequest";
    }
  return (
    <>
    {load && res.status === 200?
    <div className='container institute-request-container'>
        <div className='row'>
            {res.data.map((item,index)=>(
            <div className='col-md-4'>
            <div class="institute-request-card" href="#">
                <h3>{item.name}</h3><br/>
                <div class="small">
                <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                            {item.registeration_no?<li className="mb-2"><strong className='strlist'>Registration: </strong>{item.registeration_no}</li>:<li></li>}
                            {item.university?<li className="mb-2"><strong className='strlist'>University: </strong> {item.university}</li>:<li></li>}
                            {item.phone_no?<li className="mb-2"><strong className='strlist'>Phone: </strong> {item.phone_no}</li>:<li></li>}
                            <li className="mb-2"><strong className='strlist'>Email: </strong>{item.email}</li>
                            {item.city?<li className="mb-2"><strong className='strlist'>City: </strong>{item.city}</li>:<li></li>}
                                <li className="mb-2"><strong className='strlist'>Accrediation :</strong><button
          onClick={(event) => handlePDFDownload(event,res.accredition[index])}>Download File!
       </button></li>
       <li className="mb-2"><strong className='strlist'>Sop :</strong><button
          onClick={(event) => handlesopDownload(event,res.sop[index])}>Download File!
       </button></li>
                            </ul>
                        </div>
                    </div>
                
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn" onClick={event =>handleAccept(event,item.id)}>Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn btn-primary approval-btn" onClick={event =>handleReject(event,item.id)}>Reject</button>
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
