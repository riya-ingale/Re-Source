import React from 'react';
import "../Css/profile.css";
import img1 from "../Images/slider-image1.jpg"
import img2 from "../Images/slider-image2.jpg"
import img3 from "../Images/slider-image3.jpg"
export default function profile() {
  return (
    <>
     {/* <!-- PRE LOADER --> */}
   {/* <!-- HOME --> */}
     <section id="home">
          <div class="row">

                    <div class="owl-carousel owl-theme home-slider">
                         <div class="item item-first">
                              <div class="caption">
                                   <div class="container">
                                        <div class="col-md-6 col-sm-12">
                                             <h1>INSTITUE NAME</h1>
                                             <h3> DESCRIPTION HERE</h3>
                                             <a href="#feature" class="section-btn btn btn-default smoothScroll">MORE INFO</a>
                                        </div>
                                   </div>
                              </div>
                         </div>

                       
                    </div>
          </div>
     </section>


     {/* <!-- FEATURE --> */}
     <section id="feature">
          <div class="container">
               <div class="row">

                    <div class="col-md-6 col-sm-6">
                         <div class="feature-thumb">
                              <span></span>
                              <h3>ADDRESS</h3>
                              <p>DETAILED ADDRESS</p>
                         </div>
                    </div>

                    <div class="col-md-6 col-sm-6">
                         <div class="feature-thumb">
                              <span></span>
                              <h3>Email</h3>
                              <p>Email</p>
                         </div>
                    </div>

                    

               </div>
          </div>
     </section>



     {/* <!-- Courses --> */}
     <section id="courses">
          <div class="container">
               <div class="row">

                    <div class="col-md-12 col-sm-12">
                         <div class="section-title">
                              <h2>Check Resources <small>Upgrade your practical skills here</small></h2>
                         </div>

                         <div class="owl-carousel owl-theme owl-courses">
                              <div class="col-md-4 col-sm-4 ">
                                   <div class="item">
                                        <div class="courses-thumb">
                                             <div class="courses-top">
                                                  <div class="courses-image">
                                                       <img src="images/courses-image1.jpg" class="img-responsive" alt=""/>
                                                  </div>
                                                  <div class="courses-date">
                                                      
                                                  </div>
                                             </div>

                                             <div class="courses-detail">
                                                  <h3><a href="#">Resource Name</a></h3>
                                                  <div class="">
                                                       <ul>
                                                         <li class="lires">Cost: 1000 Rs/hour</li>
                                                         <li class="lires">Institute Name: VIT,Mumbai</li>
                                                         <li class="lires">Capacity: 100</li>
                                                       </ul>
                                                     </div>
                                             </div>

                                             <div class="courses-info">
                                                  <div class="courses-author">
                                                       <img src="images/author-image1.jpg" class="img-responsive" alt=""/>
                                                       <span>Mark Wilson</span>
                                                  </div>
                                                  <div class="courses-price">
                                                       <a href="#"><span>book</span></a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>


                         </div>

               </div>
          </div>
          </div>
     </section>


     {/* <!-- TESTIMONIAL --> */}
     <section id="testimonial">
          <div class="container">
               <div class="row">

                    <div class="col-md-12 col-sm-12">
                         <div class="section-title">
                              <h2>Student Reviews <small>from around the world</small></h2>
                         </div>

                         <div class="owl-carousel owl-theme owl-client">
                              <div class="col-md-4 col-sm-4">
                                   <div class="item">
                                        <div class="tst-image">
                                             <img src={img1} class="img-responsive" alt=""/>
                                        </div>
                                        <div class="tst-author">
                                             <h4>Jackson</h4>
                                             <span>Shopify Developer</span>
                                        </div>
                                        <p>You really do help young creative minds to get quality education and professional job search assistance. I’d recommend it to everyone!</p>
                                        <div class="tst-rating">
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                        </div>
                                   </div>
                              </div>

                              <div class="col-md-4 col-sm-4">
                                   <div class="item">
                                        <div class="tst-image">
                                             <img src={img2} class="img-responsive" alt=""/>
                                        </div>
                                        <div class="tst-author">
                                             <h4>Camila</h4>
                                             <span>Marketing Manager</span>
                                        </div>
                                        <p>Trying something new is exciting! Thanks for the amazing law course and the great teacher who was able to make it interesting.</p>
                                        <div class="tst-rating">
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                        </div>
                                   </div>
                              </div>

                              <div class="col-md-4 col-sm-4">
                                   <div class="item">
                                        <div class="tst-image">
                                             <img src={img3} class="img-responsive" alt=""/>
                                        </div>
                                        <div class="tst-author">
                                             <h4>Barbie</h4>
                                             <span>Art Director</span>
                                        </div>
                                        <p>Donec erat libero, blandit vitae arcu eu, lacinia placerat justo. Sed sollicitudin quis felis vitae hendrerit.</p>
                                        <div class="tst-rating">
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                        </div>
                                   </div>
                              </div>

                              <div class="col-md-4 col-sm-4">
                                   <div class="item">
                                        <div class="tst-image">
                                             <img src="images/tst-image4.jpg" class="img-responsive" alt=""/>
                                        </div>
                                        <div class="tst-author">
                                             <h4>Andrio</h4>
                                             <span>Web Developer</span>
                                        </div>
                                        <p>Nam eget mi eu ante faucibus viverra nec sed magna. Vivamus viverra sapien ex, elementum varius ex sagittis vel.</p>
                                        <div class="tst-rating">
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                             <i class="fa fa-star"></i>
                                        </div>
                                   </div>
                              </div>

                         </div>

               </div>
          </div>
          </div>
     </section> 

    </>
  )
}
