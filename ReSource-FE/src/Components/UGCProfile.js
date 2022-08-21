import React from 'react';
import "../Css/intituteprofile.css";
import img from '../Images/user-account.png';
import { Link } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'; 

export default function UGCProfile() {
  return (
    <>
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
            <h3>Institute Requests</h3>
            <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>Institute 1</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 2</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 3</Link></span>
            </article>
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 4</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 5</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 6</Link></span>
            </article>
            </div>
            </div>
        </div>
      <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>Already Existing Institutes</h3>
            <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>Institute 1</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 2</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 3</Link></span>
            </article>
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 4</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 5</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Institute 6</Link></span>
            </article>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div className="card profilecards workforce-list">
            <div className="card__details">
            <h3>UGC Staff<button className='btn btn-primary addstaffbtn'>New<AddCircleRoundedIcon></AddCircleRoundedIcon></button></h3>
            <article class="leaderboard__profile">
              <span class="leaderboard__name"><Link to={"/"}>Staff 1</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Staff 2</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Staff 3</Link></span>
            </article>
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Staff 4</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Staff 5</Link></span>
            </article>
    
            <article class="leaderboard__profile">
            <span class="leaderboard__name"><Link to={"/"}>Staff 6</Link></span>
            </article>
            </div>
            </div>
        </div>
      </div>
      </div>
      
    </div>   
    </>
  )
}
