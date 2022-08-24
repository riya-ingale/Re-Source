import React from 'react';
import "../Css/error404.css";

export default function Error503() {
  return (
    <div className='body-error'>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="main-error">
        <h1 className='errorh1'>503</h1>
        <p className='error-p'>Things are little unstable here...<br/>Come back soon</p>
        <button type="button error-page">Go back</button>
        </div>
    </div>
  )
}
