import React from 'react';
import "../Css/footer.css";

export default function Footer() {
  return (
    <>
    <footer>
       <div className="row justify-content-center mb-0 pt-5 pb-0 row-2 px-3">
           <div className="col-12">
                <div className="row row-2">
                    <div className="col-sm-3 text-md-center"><h5><span> </span><b>  RE-SOURCE</b></h5></div>
                    <div className="col-sm-3  my-sm-0 mt-5"><ul className="list-unstyled"><li className="mt-0">Platform</li><li>Help Center</li><li>Security</li></ul></div>
                    <div className="col-sm-3  my-sm-0 mt-5"><ul className="list-unstyled"><li className="mt-0">Customers</li><li>Use Cases</li><li>Customers Services</li></ul></div>
                    <div className="col-sm-3  my-sm-0 mt-5"><ul className="list-unstyled"><li className="mt-0">Company</li><li>About</li><li>Careers- <span className="Careers">We're-hiring</span></li></ul></div>
                </div>  
           </div>
       </div>
       <div className="row justify-content-center mt-0 pt-0 row-1 mb-0  px-sm-3 px-2">
            <div className="col-12">
                <div className="row my-4 row-1 no-gutters">
                    {/* <div className="col-sm-3 col-auto text-center"><small>&#9400; RE-SOURCE Softwere</small></div><div className="col-md-3 col-auto "></div><div className="col-md-3 col-auto"></div> */}
                    <div className="col d-flex justify-content-center  ">
                        <i className="icon fa-brands fa-twitter"></i>
                        <i className="icon fa-brands fa-facebook"></i>
                        <i className="icon fa-brands fa-linkedin"></i>
                    </div> 
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}
