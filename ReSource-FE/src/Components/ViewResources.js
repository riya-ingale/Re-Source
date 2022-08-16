import React,{useEffect, useState} from "react";
import "../Css/viewres.css";
import phy from "../Images/microscope.jpg";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";


const ResourceCard = (item) => {
	return (
		<div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={require("../temp_images/temp"+String(item.image)+".jpeg")} className="imgres" alt="Equipment Name" />
              {/* {index} */}
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
                    {/* <li className="lires boldline">Availability: Partially Available</li> */}
                    <li className="lires">Cost: {item.cost} Rs/hour</li>
                    <li className="lires">Institute Name: {item.institute_name}</li>
                    <li className="lires">Units Available in lab: {item.quantity}</li>
                  </ul>
                </div>
                <a href={'/resdetail/'+item.id}>
                <button className="btn-vr">Book Now</button>
                </a>
              </div>
            </div>
          </div>
	);
};


export default function ViewResources() {
  // var resource = {'total_count':1,'total_pages':1,'resources_data':[],'institutes':[]};
  const [res, setRes] = useState();
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1); 
  const[refresh,setRefresh] = useState(true);
  // var page = 1;
  useEffect(() => {
    if(refresh){
      fetch(
              "http://127.0.0.1:8000/resource/allres/"+1
            ).then(response=>response.json())
            .then(body=>  {
              setRes(body);
              console.log(body);
            setPageCount(body.total_pages);
              setisLoaded(true);
              console.log(isLoaded)
    })
    setRefresh(false);
  }
            // setPageCount(resource.total_pages); 
          
  }, [])
// if(res !== undefined){
//   resource = res;
//   // setPageCount(resource.total_pages); 
//   // setisLoaded(true);
// }

const handlePage = (e,p) =>{
  setcurrentPage(p);
  fetch("http://127.0.0.1:8000/resource/allres/"+p)
.then(response=>response.json())
          .then(body=>  {
            setRes(body);
            console.log(body);
          setPageCount(body.total_pages);
            setisLoaded(true);
            console.log(isLoaded)
  })
    // console.log(resource);
    // setRes(resource);
    setPageCount(res.total_pages); 
    setisLoaded(true);
}
  return (
    <>
      <div className="containner c-view-res">
        <form>
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
              />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <FormControl variant="standard" >
                <InputLabel id="demo-simple-select-standard-label">
                  Institute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value=""
                  label="Institute"
                >
                  {isLoaded ? (
                  res.institutes.map((item) =>(
                  <MenuItem value={item[1]}>{item[1]},{item[2]}</MenuItem>
                  ))
                  ):<MenuItem value="">None</MenuItem>
                }
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined">Search</Button>
            </div>
          </div>
        </form>
        <div className="row">
        {/* {data} */}
        {isLoaded ? (
        res.resources_data.map((item,index) =>(
          <ResourceCard
            name = {item.name}
            id = {item.id}
            cost = {item.cost}
            quantity = {item.quantity}
            institute_name = {item.institute_name}
            image = {index+1}
            />
         
          ))):<div></div>
        
        }
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        {isLoaded ? (
        <Pagination count={res.total_pages} variant="outlined"  color="primary" onChange={handlePage}/>):
        <div></div>
      }
        </div>
      </div>
    </>
  );
}
