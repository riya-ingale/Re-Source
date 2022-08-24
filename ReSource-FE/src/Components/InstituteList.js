import React,{useState,useEffect} from 'react';
import cardsvg from "../Images/Card.svg";
import "../Css/universityList.css";
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

export default function InstituteList() {
    // view_allinstitutes
    const [res,setRes] = useState();
    const [ load,setLoad] = useState(false);
    const[page,setPage] = useState(1);

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/institute/view_allinstitutes/"+1,{
          headers:{'Authorization':sessionStorage.getItem('token')}
        })
        .then(response=>response.json())
        .then(body=>
          {
            setRes(body);
            setLoad(true);
            console.log(body);
          })
      },[])
      const handlepagechange = (e,p) =>{
        setPage(p);
    fetch("http://127.0.0.1:8000/institute/view_allinstitutes/"+p,{
        headers:{'Authorization':sessionStorage.getItem('token')}
    })
    .then(response=>response.json())
    .then(body=>
      {
        setRes(body);
        setLoad(true);
        console.log(body);
      })
      }
  return (
    <>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>

        <div class="container University-List-Container">
        <form>
          <div className="row">
            
            <div className="col-md-6 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                className='Search-bar'
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined">Search</Button>
            </div>
          </div>
        </form>
        <div class="row">
            {res.institutes_data.map((item,index)=>(
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
            
            ))}
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={res.total_pages} variant="outlined" onChange={handlepagechange}  color="primary"/>
        </div>
        </div>
    </>
  )
}
