import React,{useState,useEffect} from 'react';
import "../Css/resourcedetail.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import { useParams } from 'react-router';

export default function LabDetails() {
  const [res,setRes] = useState();
  const [load,setLoad] = useState(false);
const { id } = useParams();
const [page,setPage] = useState(1);
useEffect(() => {
  console.log("http://127.0.0.1:8000/lab/view/"+id+"/"+1)
  fetch(
          "http://127.0.0.1:8000/lab/view/"+id+"/"+1,{
            headers:{'Authorization':sessionStorage.getItem('token')}
          }).then(response=>response.json())
          .then(body=>
            {
              setRes(body);
              setLoad(true);
              console.log(body);
            })
          // image_fetcher(users.images)
          // console.log(image)
}, [id])
const handleres = (e,p) =>{
  setPage(p);
  fetch("http://127.0.0.1:8000/lab/view/"+id+"/"+p,
  {
    headers:{'Authorization':sessionStorage.getItem('token')}
  }
  )
  .then(response=>response.json())
  .then(body=>
    {
      setRes(body);
      setLoad(true);
      console.log(body);
    })
}
console.log(res);
  return (
    <>
    {load && res.status === 200?
    <div className="pd-wrap">
      <div className="container">
        <div className="heading-section">
          <h2>Lab Details</h2>
        </div>
        <div className="row lab-row">
          {/* <div className="col-md-6">
           
          </div> */}
          <div className="col-md-12">
            <div className="product-dtl">
              {/* <div className="product-info">
                <div className="product-name">Lab Name: {res.lab_data.name}</div>
              </div> */}
              
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <div className='row'>
                      <div className='col-md-6'>
                          <ul className="list-bullets">
                          <li className="mb-2"><strong className='strlist'>Lab Name: </strong>{res.lab_data.name}</li>
                          <li className="mb-2"><strong className='strlist'>Institute Name: </strong>{res.lab_data.institute_name}</li>
                              {/* <li className="mb-2"><strong>Specification: </strong>High Bandwidth</li> */}
                          </ul>
                      </div>
                      <div className='col-md-6'>
                          <ul className="list-bullets">
                            
                              <li className="mb-2"><strong className='strlist'>Lab Timings: </strong>{res.lab_data.start_time}-{res.lab_data.end_time} Hrs.</li>
                              <li className="mb-2"><strong className='strlist'>Lab Assistant: </strong> {res.lab_data.workforce_name}</li>
                              {/* <li className="mb-2"><strong className='strlist'>Support Staff: </strong>Some detail</li> */}
                              {/* <li className="mb-2"><strong></strong></li> */}
                          </ul>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <p className='heading res-cards'><h3 class="heading_name">Resources Available in this Lab</h3></p>
      <div className="row">
        {res.resources_data.map((item,index)=>(
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
                    <li className="lires">Cost: {item.cost} Rs/hour</li>
                    <li className="lires">Quantity: {item.quantity}</li>
                    <li className='lires'>Domain: {item.subject}</li>
                  </ul>
                </div>
                <a href={'/resdetail/'+item.id}>
                <button className="btn-vr" >Book Now</button>
                </a>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="d-flex justify-content-center pagination-div">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={res.total_resource_pages} variant="outlined" onChange={handleres}  color="primary" />
        </div>
    </div>
    :<div></div>}
  </>
  )
}
