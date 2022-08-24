import React from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'; 

export default function UGCProfile() {
  const [loader,setLoader] = useState(false);
  const[res,setRes] = useState();
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/institute/profile/",{
      headers:{'Authorization':sessionStorage.getItem('token')}
    })
    .then(response=>response.json())
    .then(body=>
      {
        setRes(body);
        setLoader(true);
        console.log(body);
      })
  },[])
  const pendingreq = (e) =>{
    window.location.href = "/univrequest"
  }
  return (
    <>
    {loader&&res.status===200?
    <div className='container profile-container'>
      <div className='bg-box'>
      </div>
      <div className='blur-bg'>
        <div className='inner-blur MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-b5x8ma'>
          <div className='row row-blur'>
            <div className='col-md-2 '>
              <div className='profile-pic-div'>
                <img src={img} className='profile-image' alt='profile'></img>
              </div>
            </div>
            <div className='col-md-10'>
              <p>
                <h1 className="Profile-name">Institute Name</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container details-container'>
      <div className='row'>
      <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>University Requests</h3>
            {res.pending_universities.map((item,index)=>(
              <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>item.name</Link></span>
            </article>
            ))}
            </div>
            </div>
        </div>
      <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>Accepted Universities</h3>
            {res.universities.map((item,index)=>(
              <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>item.name</Link></span>
            </article>
            ))}
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>UGC Staff<button className='btn btn-primary addstaffbtn'>New<AddCircleRoundedIcon></AddCircleRoundedIcon></button></h3>
            {res.ugc_staff.map((item , index)=>(
              <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>Staff 1</Link></span>
            </article>
            ))}
            </div>
            </div>
        </div>
      </div>
      </div>
      
    </div> :<div></div>}  
    </>
  )
}
