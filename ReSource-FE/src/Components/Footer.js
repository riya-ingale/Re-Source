import React from 'react';
import "../Css/footer.css";
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <>
    <footer>
       <div className="row justify-content-center mb-0 pt-5 pb-0 row-2 px-3">
           <div className="col-12">
                <div className="row row-2">
                    <div className="col-sm-3 text-md-center"><h5><span> </span><b>  RE-SOURCE</b></h5></div>
                    <div className="col-sm-3  my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-0">
                                Explore
                            </li>
                            <li className="mt-0">
                                <Link className='link-explore' to={"/universityList"}>Universities</Link>
                            </li>
                            <li className="mt-0">
                                <Link className='link-explore' to={"/instituteList"}>Institutes</Link>
                            </li>
                            <li className="mt-0">
                                <Link className='link-explore' to={"/viewlab"}>Labs</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-3  my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-0"><i class="fa-solid fa-location-dot"></i> Address</li>
                            <li>University Grants Commission (UGC)</li>
                            <li>Bahadur Shah Zafar Marg,</li>
                            <li>New Delhi - 110002.</li>
                        </ul>
                    </div>
                    <div className="col-sm-3  my-sm-0 mt-5">
                        <ul className="list-unstyled">
                            <li className="mt-0"><i class="fa-solid fa-phone"></i> Contact:</li>
                            <li>011-23604446 </li>
                            <li>011-23604200</li>
                            <li>Website- <span className="Careers"><a href='https://www.ugc.ac.in/' style={{color: "#caced1",textDecoration: "underline"}}>UGC</a></span></li></ul></div>
                </div>  
           </div>
       </div>
       <div className="row justify-content-center mt-0 pt-0 row-1 mb-0  px-sm-3 px-2">
            <div className="col-12">
                <div className="row my-4 row-1 no-gutters">
                    {/* <div className="col-sm-3 col-auto text-center"><small>&#9400; RE-SOURCE Softwere</small></div><div className="col-md-3 col-auto "></div><div className="col-md-3 col-auto"></div> */}
                    <div className="col d-flex justify-content-center  ">
                        <a className="social-Links" href={"https://twitter.com/ugc_india?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"}>
                           <i className="icon fa-brands fa-twitter"></i>
                        </a> 
                        <a className="social-Links" href={"https://www.facebook.com/universitygrantscommission.UGC/"}>
                            <i className="icon fa-brands fa-facebook"></i>
                        </a>
                        <a className="social-Links" href={"https://www.linkedin.com/company/ugc-india/?originalSubdomain=in"}>
                            <i className="icon fa-brands fa-linkedin"></i>
                        </a>  
                    </div> 
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}
