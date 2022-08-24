import React,{useState,useEffect} from 'react';
import "../Css/viewres.css";
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

const ResourceCard = (item) => {
	return (
		<div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={require("../temp_images/default_image.jpeg")} className="imgres" alt="Equipment Name" />
              {/* {index} */}
              {/* <!-- A div with card__details class to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                <div className="name">Lab Name: {item.name}</div>
                {/* <span class="discount">Partially Available</span> */}
                <div className="">
                  <ul>
                    {/* <li className="lires boldline">Availability: Partially Available</li> */}
                    <li className="lires">Lab Assistant: {item.labassist}</li>
                    <li className="lires">Institute Name: {item.institute_name}</li>
                    <li className="lires">Timings: {item.start_time} - {item.end_time} Hrs.</li>
                  </ul>
                </div>
                <a href={'/labdetail/'+item.id}>
                <button className="btn-vr">View More</button>
                </a>
              </div>
            </div>
          </div>
	);
};


export default function ViewLabs() {
  const [res, setRes] = useState();
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1); 
  const[refresh,setRefresh] = useState(true);
  const[institute,setInstitute] = useState("");
  const[date,setDate] = useState();
  const[search,setSearch] = useState();

  // var page = 1;
  useEffect(() => {
    if(refresh){
      fetch(
              "http://127.0.0.1:8000/lab/all/"+1,{
                headers:{'Authorization':sessionStorage.getItem('token')}
              })
            .then(response=>response.json())
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
  if(institute === "" && date === undefined && search === undefined){
    setcurrentPage(p);
    fetch("http://127.0.0.1:8000/lab/all/"+p,{
      headers:{'Authorization':sessionStorage.getItem('token')}
    })
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
  else{
    var filterdata ={}
    if(institute !== ""){
      filterdata['institute_id'] = Number(institute);
    }
    if(date !== undefined){
      filterdata['required_date'] = date;
    }
    if(search !== undefined){
      filterdata['searchtext'] = search
    }
    if(p===undefined){
    p = 1;
    setcurrentPage(p);
    console.log(p);
    }
    console.log(filterdata)
    fetch('http://127.0.0.1:8000/lab/all/'+p, {
      method: 'POST',
      headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token')},
      body: JSON.stringify(filterdata)
    }).then(response=>response.json())
            .then(body=>  {
              setRes(body);
            setPageCount(body.total_pages);
              setisLoaded(true);
    })
      setPageCount(res.total_pages); 
      setisLoaded(true);

  }
}
console.log(res)
const filter = (e) =>{
  handlePage(1);
  // searchtext
  // institute_id
  // required_date
  // const filterdata = {username,password,institute}
  // fetch('http://127.0.0.1:8000/resource/allres/', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(filterdata)
  //   })
}

const handleinsti = (e) => {
  setInstitute(e.target.value);
}

const handledate = (e) => {
  setDate(e.target.value);
}

const handlesearch = (e) => {
  setSearch(e.target.value);
}

  return (
    <>
    {isLoaded?
    <div className="containner c-view-res">
        <form>
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
              {/* <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handledate}
              /> */}
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                onChange={handlesearch}
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
                  value={institute}
                  label="Institute"
                  onChange={handleinsti}
                >
                  {isLoaded ? (
                  res.institutes.map((item) =>(
                  <MenuItem value={item[0]}>{item[1]},{item[2]}</MenuItem>
                  ))
                  ):<MenuItem value="">None</MenuItem>
                }
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined" onClick={filter}>Search</Button>
            </div>
          </div>
        </form>
        <div className="row">
        {isLoaded ? (
        res.labs_data.map((item,index) =>(
          <ResourceCard
            name = {item.name}
            id = {item.id}
            labassist = {item.workforce_name}
            start_time = {item.start_time}
            end_time = {item.end_time}
            institute_name = {item.institute_name}
            // image = {index+1}
            />
         
          ))):<div></div>
        
        }
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={res.total_pages} variant="outlined"  color="primary" onChange={handlePage} />
        </div>
      </div>:<div></div>}
    </>
  )
}
