import React from "react";
import styled from "styled-components";
// Assets

import HeaderImage from "../../Profileassets/img/header-img.png";

import Dots from "../../Profileassets/svg/Dots";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

// import FormControl from '@mui/material/FormControl';
// import FormControl from '@mui/material/FormControl';
// // or
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';


export default function Header() {
  const [role, setRole] = React.useState(''); 

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    
    <Wrapper id="home" className="landing-page-container flexSpaceCenter" style={{paddingTop: "0px"}} >
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font60">We are Resource Sharing Portal.</h1>

          <HeaderP className="font20 semiBold">
          We aim to help out the community by sharing, <br></br>You'll find all types of resources here
          </HeaderP>
          
            {/* <FullButton title="Register Institutes" /> */}
          
          <div>
          <>
          {/* <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label" >Login/SignUp</InputLabel>
            <Select
              class="btn-profile-login"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={role}
              onChange={handleChange}
              autoWidth
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Institute </MenuItem>
              <MenuItem value={21}>University</MenuItem>
              <MenuItem value={22}>UGC</MenuItem>
              <MenuItem value={10}>Accountant </MenuItem>
              <MenuItem value={21}>Lab Assistant</MenuItem>
              <MenuItem value={22}>Teacher</MenuItem>
            </Select>
          </FormControl> */}
          </>
        </div>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img className="radius8" src={HeaderImage} alt="office" style={{zIndex: "9", marginTop:"50px"}} />
          {/* <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className="font15 whiteColor">
                <em>Friends, such as we desire, are dreams and fables. Friendship demands the ability to do without it.</em>
              </p>
              <p className="font13 orangeColor textRight" style={{marginTop: '10px'}}>Ralph Waldo Emerson</p>
            </div>
          </QuoteWrapper> */}
          <DotsWrapper>
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
        {/* <GreyDiv className="lightBg"></GreyDiv> */}
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 50vw;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;

const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;


