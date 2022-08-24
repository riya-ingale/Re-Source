import React,{useState,useEffect} from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router';


export default function ViewUniversityProfile() {
  const [res,setRes] = useState();
  const [load,setLoad] = useState(false);
  const { id } = useParams();
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/institute/view_university/"+id,{
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
  return (
    <>
    {load && res.status === 200?
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
                <h1 className="Profile-name">University Name : {res.university_data.name}</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container details-container'>
      <div className='row'>
        <div className='col-md-6'>
        <div className="card profilecards">
            <div className="card__details">
            {/* <h3>Profile details <Link to="/"><EditIcon></EditIcon></Link></h3> */}
            <ul className="list-bullets detail-list">
            {res.university_data.city?<li className="mb-2"><strong className='strlist'>City: </strong> {res.university_data.city}</li>:<div></div>}
            {res.university_data.state?<li className="mb-2"><strong className='strlist'>State: </strong>{res.university_data.state}</li>:<div></div>}
            {res.university_data.pincode?<li className="mb-2"><strong className='strlist'>Pincode: </strong>{res.university_data.pincode}</li>:<div></div>}
              <li className="mb-2"><strong className='strlist'>Email: </strong>{res.university_data.email}</li>
              {res.university_data.phone_no?<li className="mb-2"><strong className='strlist'>Phone Number: </strong>{res.university_data.phone_no}</li>:<div></div>}
              <li className="mb-2"><strong className='strlist'>Affliated Institutes: </strong>{res.institute_data.length}</li>
            </ul>
            </div>
            </div>
        </div>
        <div className='col-md-6'>
        <div className="card profilecards workforce-list">
          
            <div className="card__details">
            { res.institute_data.map((item,index)=>(
              <a href={'/viewInstituteProfile/'+item.id}>
            <article class="leaderboard__profile">
              <span class="leaderboard__name">{item.name}</span>
            </article>
            </a>
              ))}
            </div>
            </div>
        </div>
      </div>
      </div>
    </div>  
    :<div></div>}
    </>
  )
}
