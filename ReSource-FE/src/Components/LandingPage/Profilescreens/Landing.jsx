import React from "react";
// Sections
import TopNavbar from "../Profilecomponents/Nav/TopNavbar";
import Header from "../Profilecomponents/Sections/Header";
import Services from "../Profilecomponents/Sections/Services";
import Projects from "../Profilecomponents/Sections/Projects";
import Contact from "../Profilecomponents/Sections/Contact";
import Pricing from "../Profilecomponents/Sections/Pricing";

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
      <Projects />
      
      <Contact />
    </>
  );
}
