  import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import { Link } from "react-scroll";
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';

  // import FormControl from '@mui/material/FormControl';
  // import FormControl from '@mui/material/FormControl';
  // // or
  import { FormControl } from '@mui/material';
  import Select from '@mui/material/Select';
  
  // // Assets
  import logo from "../../../../Images/logo.png"
  // import LogoIcon from "../../assets/svg/Logo";
  import BurgerIcon from "../../Profileassets/svg/BurgerIcon";
  
  export default function TopNavbar() {
    const [y, setY] = useState(window.scrollY);
    const [sidebarOpen, toggleSidebar] = useState(false);
  
    useEffect(() => {
      window.addEventListener("scroll", () => setY(window.scrollY));
      return () => {
        window.removeEventListener("scroll", () => setY(window.scrollY));
      };
    }, [y]);
    const [role, setRole] = React.useState('');
  
    const handleChange = (event) => {
      setRole(event.target.value);
      sessionStorage.setItem("role_id",event.target.value);
      window.location.href = '/login'
    };
    return (
      <>
        <Wrapper
          className="flexCenter animate whiteBg"
          style={y > 100 ? { height: "60px" } : { height: "80px" }}
        >
          <NavInner className="landing-page-container flexSpaceCenter">
            <Link className="pointer flexNullCenter" to="home" smooth={true}>
              {/* <LogoIcon /> */}

              <Link className="navbar-brand" to="/">
                <img className="logo" src={logo}/>
              </Link>
              <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
                Re-Source
              </h1>
            </Link>
            <BurderWrapper
              className="pointer"
              onClick={() => toggleSidebar(!sidebarOpen)}
            >
              <BurgerIcon />
            </BurderWrapper>
            <UlWrapper className="flexNullCenter">
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px" }}
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Home
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px" }}
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Services
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px" }}
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Institutes
                </Link>
              </li>
              {/* <li className="semiBold font15 pointer">
                <Link activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                  Blog
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                  Pricing
                </Link>
              </li> */}
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px" }}
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Contact
                </Link>
              </li>
            </UlWrapper>
            <UlWrapperRight className="flexNullCenter nav-login-btn">
              <li className="semiBold font15 pointer">
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-autowidth-label" >Login/SignUp</InputLabel>
                  <Select
                    class="btn-profile-login radius8 lightBg"
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={role}
                    onChange={handleChange}
                    autoWidth
                    label="Role"
                  >
                    <MenuItem value="">
                      <em>Select the Role</em>
                    </MenuItem>
                    <MenuItem value={3}>Institute </MenuItem>
                    <MenuItem value={2}>University</MenuItem>
                    <MenuItem value={1}>UGC</MenuItem>
                    <MenuItem value={8}>Accountant </MenuItem>
                    <MenuItem value={4}>Lab Assistant</MenuItem>
                    {/* <MenuItem value={5}>Teacher</MenuItem>
                    <MenuItem value={9}>UGC Staff</MenuItem> */}
                  </Select>
                </FormControl>
              </li>
  
            </UlWrapperRight>
          </NavInner>
        </Wrapper>
      </>
    );
  }
  
  const Wrapper = styled.nav`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  `;
  const NavInner = styled.div`
    position: relative;
    height: 100%;
  `;
  const BurderWrapper = styled.button`
    outline: none;
    border: 0px;
    background-color: transparent;
    height: 100%;
    padding: 0 15px;
    display: none;
    @media (max-width: 760px) {
      display: none;
    }
  `;
  const UlWrapper = styled.ul`
    display: flex;
    @media (max-width: 760px) {
      display: none;
    }
  `;
  const UlWrapperRight = styled.ul`
    @media (max-width: 760px) {
      display: top-center;
    }
  `;