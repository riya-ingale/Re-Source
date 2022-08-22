import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#0458d6" : "#0458d6")};
  background-color: ${(props) => (props.border ? "transparent" : "#0458d6")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "" : "white")};
  :hover {
    background-color: ${(props) => (props.border ? "#0458d6" : "#2c7bf2")};
    border: 1px solid #0458d6;
    color: ${(props) => (props.border ? "white" : "#fff")};
  }
`;

