import React from 'react';
import "../Css/labreq.css";
import labimg from "../Images/home5.jpg"


export default function Labrequest() {
  return (
    <>
    <div className='container lab-request'>
    <div className="row">
                <div className="col-lg-4">
                    <div className="card card-margin">
                        <img src={labimg} className="card-img-top" alt="..."/>
                        <div className="middle">
                            <div className="text">Capacity: 9</div>
                        </div>
                        <div className="card-header no-border">
                            <h5 className="card-title">Lab Name</h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-title-wrapper">
                                    <div className="widget-49-date-primary">
                                        <span className="widget-49-date-day">09</span>
                                        <span className="widget-49-date-month">apr</span>
                                    </div>
                                    <div className="widget-49-meeting-info">
                                        <span className="widget-49-pro-title">Venue: Mumbai</span>
                                        <span className="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                                    </div>
                                </div>
                                {/* <!-- <ul className="widget-49-meeting-points">
                                    <li className="widget-49-meeting-item"><span>Expand module is removed</span></li>
                                    <li className="widget-49-meeting-item"><span>Data migration is in scope</span></li>
                                    <li className="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li>
                                </ul> --> */}
                                <div className="widget-49-meeting-action">
                                    <button href="#" className="btn btn-primary lab-btns">Accept</button>
                                    <button href="#" className="btn btn-primary lab-btns">Reject</button>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
                <div className="col-lg-4">
                    <div className="card card-margin">
                        <img src={labimg} className="card-img-top" alt="..."/>
                        <div className="card-header no-border">
                            <h5 className="card-title">Lab Name</h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-title-wrapper">
                                    <div className="widget-49-date-primary">
                                        <span className="widget-49-date-day">09</span>
                                        <span className="widget-49-date-month">apr</span>
                                    </div>
                                    <div className="widget-49-meeting-info">
                                        <span className="widget-49-pro-title">Venue: Mumbai</span>
                                        <span className="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                                    </div>
                                </div>
                                
                                <div className="widget-49-meeting-action">
                                    <button href="#" className="btn btn-primary lab-btns">Accept</button>
                                    <button href="#" className="btn btn-primary lab-btns">Reject</button>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
                <div className="col-lg-4">
                    <div className="card card-margin">
                        <img src={labimg} className="card-img-top" alt="..."/>
                        <div className="card-header no-border">
                            <h5 className="card-title">Lab Name</h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-title-wrapper">
                                    <div className="widget-49-date-primary">
                                        <span className="widget-49-date-day">09</span>
                                        <span className="widget-49-date-month">apr</span>
                                    </div>
                                    <div className="widget-49-meeting-info">
                                        <span className="widget-49-pro-title">Venue: Mumbai</span>
                                        <span className="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                                    </div>
                                </div>
                                
                                <div className="widget-49-meeting-action">
                                    <button href="#" className="btn btn-primary lab-btns">Accept</button>
                                    <button href="#" className="btn btn-primary lab-btns">Reject</button>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
            </div>
    </div>
    </>
  )
}
