import React from 'react';
import "../Css/error404.css";

export default function error404() {
  return (
    <div className='body-error'>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="main-error">
    <h1 className='errorh1'>404</h1>
    <p className='error-p'>It looks like you're lost...<br/>That's a trouble?</p>
    <button type="button error-page">Go back</button>
    </div>
    </div>
  )
}
