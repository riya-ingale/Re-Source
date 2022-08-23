import React from 'react';
import cardsvg from "../Images/Card.svg";
import "../Css/universityList.css";
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';

export default function UniversityList() {
  return (
    <>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>

        <div class="container University-List-Container">
        <form>
          <div className="row">
            
            <div className="col-md-6 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                className='Search-bar'
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined">Search</Button>
            </div>
          </div>
        </form>
        <div class="row">
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>University Name</h3>
                    </div>
                    <div class="solu_description">
                    <div className="">
                        <ul>
                            <li className="lires boldline">City, State: Mumbai,Maharashtra</li>
                            <li className="lires">Registration Number: 3245</li>
                            <li className="lires">Contact: 9821255160</li>
                            <li className="lires">  Email: MumbaiUniversity@gmail.com</li>
                        </ul>
                    </div>
                    <button type="button" class="read_more_btn">View</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
                    </div>
                </div>
            
                </div>
            </div>
            </div>
            <div class="col-md-4">
            <div class="our_solution_category">
                <div class="solution_cards_box">
                <div class="solution_card">
                    <div class="hover_color_bubble"></div>
                    <div class="so_top_icon">
                    <img src={cardsvg} />
                    </div>
                    <div class="solu_title">
                    <h3>Demo 1</h3>
                    </div>
                    <div class="solu_description">
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <button type="button" class="read_more_btn">Read More</button>
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
