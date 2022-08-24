import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import "../Css/addlab.css"
import { useParams } from 'react-router';

export default function Addlab() {
  const location = useLocation();
  var lab_id = location.pathname.split('/')[2];


  useEffect(() => {
    if(location.pathname.split('/')[1] === 'editlab'){
      console.log('pathname', location.pathname);
      setUpdate(true);
    
    fetch(
            "http://127.0.0.1:8000/lab/edit/"+lab_id,{
              headers:{'Authorization':sessionStorage.getItem('token')}
            })
          .then(response=>response.json())
          .then(body=>  {

            setStart(body['data']['start_time']);
            setEnd(body['data']['end_time']);
            setLabd(body['data']['name']);
          })

            // image_fetcher(users.images)
            // console.log(image)
          }
  }, [lab_id])

  const [start,setStart] = useState();
  const navigate = useNavigate();
  const [update,setUpdate] = useState(false);
  const [end,setEnd] = useState();
  const [labd,setLabd] = useState();
  console.log(start,end,labd);
  const add_lab = (e) =>{
    console.log(start,end,labd);
    fetch('http://127.0.0.1:8000/lab/add/', { //role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json" ,'Authorization':sessionStorage.getItem('token')},
      body: JSON.stringify({'name':labd,"start_time":start,"end_time":end})
    }).then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Successfully added a lab")
      }})
    navigate('/viewlab');
  }
  const handle_start = (e) =>{
    setStart(e.target.value);
  }

  const updt_lab = (e) =>{
    fetch('http://127.0.0.1:8000/lab/edit/'+lab_id, { //role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token') },
      body: JSON.stringify({'name':labd,"start_time":start,"end_time":end})
    }).then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Successfully updated a lab")
      }})
      navigate('/viewlab');
  }

  const handle_end = (e) =>{
    setEnd(e.target.value);
  }

  const handle_name = (e) =>{
    setLabd(e.target.value);
  }

  return (
    <>
    <div className="container form-container">
    <div className="title title-add-lab">Add Labs Here</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Lab Name</span>
            <input type="text" placeholder="Lab Name" value={labd} onChange={handle_name} required/>
          </div>
          
          <div className="input-box">
            <span className="details">Start Time</span>
            <input type="time" placeholder="" value={start} onChange={handle_start} required/>
          </div>
          <div className="input-box">
            <span className="details">End Time</span>
            <input type="time" placeholder="" value={end} onChange={handle_end} required/>
          </div>
          
        </div>
        {/* <div className="button">
          <input type="submit" value="Register" onClick={add_lab}/>
        </div> */}
        <div className="btn btn-primary">
          {update?
          <button type='button' onClick={updt_lab}>Update</button>
        :
        <button type='button' onClick={add_lab}>Register</button>}

        </div>
      </form>
    </div>
  </div>
    </>
  )
}
