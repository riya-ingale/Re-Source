import React from 'react';
import "../Css/wfreq.css";
import profile from "../Images/user-account.png";


export default function WorkforceRequest() {
  return (
    <>
    <div className='row wfreq-container'>
        <div className='col-md-6 sec'>
            <div className="blog_post">
                <div className="img_pod">
                    <img src={profile} className="profile" alt="random image"/>
                </div>
                <div className="container_copy">
                    <h3 className='Department'>Department</h3>
                    <h1 className='wf-position'>Accountant</h1>
                    <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                                <li className="mb-2"><strong className='strlist'>Name: </strong> David Fernandez</li>
                                <li className="mb-2"><strong className='strlist'>Phone: </strong> 9778365432</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>david2445@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn_primary">Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn_primary">Reject</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div className='col-md-6 sec'>
            <div className="blog_post">
                <div className="img_pod">
                    <img src={profile} className="profile" alt="random image"/>
                </div>
                <div className="container_copy">
                    <h3 className='Department'>Department</h3>
                    <h1 className='wf-position'>Accountant</h1>
                    <div className='row data-wf'>
                        <div className='col-md-12'>
                            <ul className="list-bullets wflist">
                                <li className="mb-2"><strong className='strlist'>Name: </strong> David Fernandez</li>
                                <li className="mb-2"><strong className='strlist'>Phone: </strong> 9778365432</li>
                                <li className="mb-2"><strong className='strlist'>Email: </strong>david2445@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn_primary">Approve</button>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn_primary">Reject</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    </div>
    </>
  )
}
