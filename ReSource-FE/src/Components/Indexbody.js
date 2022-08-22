import React from "react";
import { Helmet } from "react-helmet";
// Screens
import Landing from "./LandingPage/Profilescreens/Landing.jsx";
import "./LandingPage/Profilestyle/flexboxgrid.min.css";
import "./LandingPage/Profilestyle/index.css";

export default function Indexbody() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Landing />
    </>
  )
}
