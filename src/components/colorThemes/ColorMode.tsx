//@ts-nocheck
import {
  CyberpunkColors,
  DarkColors,
  LightColors,
  PastelColors,
  GreenColors,
} from "./Colors.model.tsx";
import ColorHandler from "./ColorHandler.tsx";
import { DropdownButton, Dropdown } from "react-bootstrap";
import React from "react";
import "../../styles/Dashboard.scss";


const ColorMode = () => {
  return (
    <DropdownButton className="btn" id='dropdown' title={"Change Colors"}>
      <Dropdown.Item onClick={() => ColorHandler(DarkColors)}>Dark Mode</Dropdown.Item>
      <Dropdown.Item onClick={() => ColorHandler(LightColors)}>Light Mode</Dropdown.Item>
      <Dropdown.Item onClick={() => ColorHandler(PastelColors)}>Pastel Mode</Dropdown.Item>
      <Dropdown.Item onClick={() => ColorHandler(GreenColors)}>Green Mode</Dropdown.Item>
      <Dropdown.Item onClick={() => ColorHandler(CyberpunkColors)}>Cyberpunk Mode</Dropdown.Item>
    </DropdownButton>
  );
};

export default ColorMode;
