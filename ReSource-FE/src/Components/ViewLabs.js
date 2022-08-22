import React from 'react';
import "../Css/viewres.css";
import chem from "../Images/chem-quip.jpg";
import bio from "../Images/images.jpg";
import phy from "../Images/microscope.jpg";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

export default function ViewLabs() {
  return (
    <>
    <div className="containner c-view-res">
        <form>
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center">
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
            <div className="col-md-3 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
              />
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <FormControl variant="standard" >
                <InputLabel id="demo-simple-select-standard-label">
                  Institute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value=""
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined">Search</Button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={chem} className="imgres" alt="Equipment Name" />

              {/* <!-- A div with card__details  to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                <div className="name">Equipment Name</div>
                {/* <span class="discount">Partially Available</span> */}

                <div className="">
                  <ul>
                  <li className="lires">Capacity: 100</li>
                    <li className="lires">Domain: Physice Lab</li>
                    <li className="lires">Institute Name: VIT,Mumbai</li>
                    <li className="lires">Lab Assistant: Rajeev</li>
                  </ul>
                </div>

                <button className="btn-vr">View Lab</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={bio} className="imgres" alt="Equipment Name" />

              {/* <!-- A div with card__details class to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                <div className="name">Equipment Name</div>

                <div className="">
                  <ul>
                  <li className="lires">Capacity: 100</li>
                    <li className="lires">Domain: Physice Lab</li>
                    <li className="lires">Institute Name: VIT,Mumbai</li>
                    <li className="lires">Lab Assistant: Rajeev</li>
                  </ul>
                </div>

                <button className="btn-vr">View Lab</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 colvr">
            <div className="card rescard">
              <img src={phy} className="imgres" alt="Equipment Name" />

              {/* <!-- A div with card__details class to hold the details in the card  --> */}
              <div className="card__details">
                {/* <!-- Span with tag class for the tag --> */}
                {/* <span className="tag">Nature</span>

                <span className="tag">Lake</span> */}

                {/* <!-- A div with name class for the name of the card --> */}
                <div className="name">Equipment Name</div>
                {/* <span class="discount">Partially Available</span> */}
                <div className="">
                  <ul>
                  <li className="lires">Capacity: 100</li>
                    <li className="lires">Domain: Physice Lab</li>
                    <li className="lires">Institute Name: VIT,Mumbai</li>
                    <li className="lires">Lab Assistant: Rajeev</li>
                  </ul>
                </div>

                <button className="btn-vr">View Lab</button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        {/* <Button variant="text">Show More</Button> */}
        <Pagination count={10} variant="outlined"  color="primary" />
        </div>
      </div>
    </>
  )
}
