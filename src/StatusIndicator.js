import React from "react";
import styled from "styled-components";

export const StatusIndicator = ({ onChange, status = "CLOSED" }) => (
  <>
    <Circle
      onClick={() => onChange("OPEN")}
      color="green"
      selected={status === "OPEN"}
    />
    <Circle
      onClick={() => onChange("HOLD")}
      color="yellow"
      selected={status === "HOLD"}
    />
    <Circle
      onClick={() => onChange("CLOSED")}
      color="red"
      selected={status === "CLOSED"}
    />
  </>
);

const Circle = styled.div`
  border-radius: 50%;
  background-color: ${({ color, selected }) =>
    selected ? color : "transparent"};
  border: solid 2px ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? "0" : "2")};
  width: 20px;
  height: 20px;
  cursor: pointer;
  float: left;
  margin: 0 4px;
`;
