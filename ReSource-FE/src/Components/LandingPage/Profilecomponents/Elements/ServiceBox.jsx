import React from "react";
import styled from "styled-components";
// Assets
import RollerIcon from "../../Profileassets/svg/Services/RollerIcon";
import MonitorIcon from "../../Profileassets/svg/Services/MonitorIcon";
import BrowserIcon from "../../Profileassets/svg/Services/BrowserIcon";
import PrinterIcon from "../../Profileassets/svg/Services/PrinterIcon";
import HierarchyIcon from "../../Profileassets/svg/Services/hierarchy";
// import tree from "../../assets/svg/tree.svg";

export default function ServiceBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
    case "roller":
      getIcon = <RollerIcon />;
      break;
    case "hierarchy":
      getIcon = <HierarchyIcon />;
      break;
    case "monitor":
      getIcon = <MonitorIcon />;
      break;
    case "browser":
      getIcon = <BrowserIcon />;
      break;
    case "printer":
      getIcon = <PrinterIcon />;
      break;
    default:
      getIcon = <tree />;
      break;
    
  }


  return (
    <Wrapper className="flex flexColumn">
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font20 Bold">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  color:black;
`;