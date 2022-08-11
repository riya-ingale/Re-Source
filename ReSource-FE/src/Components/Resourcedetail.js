import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../Images/chem-quip.jpg";
import img2 from "../Images/microscope.jpg";
import img3 from "../Images/chem-quip.jpg";
import "../Css/resourcedetail.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';

export default function Resourcedetail() {
  return (
    <>
      <div className="pd-wrap">
        <div className="container">
          <div className="heading-section">
            <h2>Product Details</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Carousel fade>
                <Carousel.Item>
                  <img className="d-block w-100" src={img1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={img3} alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">Variable Product</div>
                  <div className="reviews-counter">
                    <div className="rate">
                      <input
                        type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        checked
                      />
                      <label for="star5" title="text">
                        5 stars
                      </label>
                      <input
                        type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        checked
                      />
                      <label for="star4" title="text">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        checked
                      />
                      <label for="star3" title="text">
                        3 stars
                      </label>
                      <input type="radio" id="star2" name="rate" value="2" />
                      <label for="star2" title="text">
                        2 stars
                      </label>
                      <input type="radio" id="star1" name="rate" value="1"/>
                      <label for="star1" title="text">
                        1 star
                      </label>
                    </div>
                    <span>3 Reviews</span>
                  </div>
                  <div className="product-price-discount">
                    <span>Rs 3900.00</span>
                  </div>
                </div>
                <p>
                    Specification: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <br></br>
                    Details:
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  
                </p>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ul className="list-bullets">
                                <li className="mb-2"><strong className='strlist'>Domain: </strong> Physics</li>
                                <li className="mb-2"><strong className='strlist'>Dimension: </strong> 2ft x 2ft</li>
                                {/* <li className="mb-2"><strong>Specification: </strong>High Bandwidth</li> */}
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <ul className="list-bullets">
                                <li className="mb-2"><strong className='strlist'>Quantity: </strong> 50</li>
                                <li className="mb-2"><strong className='strlist'>Details: </strong>Some detail</li>
                                {/* <li className="mb-2"><strong></strong></li> */}
                            </ul>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <form>
          <div className="row slot-booking">
            <div className="col-md-4 d-flex justify-content-center">
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Capacity"
                variant="standard"
              />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined">Find Slots</Button>
            </div>
          </div>
        </form>
        <div className=''>
        <div className="card card-booking">
        <div className="outer-slot-div">
            <div className="cat">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat ">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat ">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat ">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            <div className="cat">
            <label>
                <input type="checkbox" value="1"/><span>9:00 - 10:00</span>
            </label>
            </div>

            </div>
        </div>
        </div>
        </div>
        <div className='d-flex justify-content-center bookNow'>
            <button className="button-86" role="button">Book Now</button>
        </div>
      </div>
    </>
  );
}
