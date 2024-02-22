import React from "react";
import styled from "styled-components";

const LabelFooter = styled.label`
  font-size: 1rem;
  color: #fff;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;
const DivFooter = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

export const Footer = () => {
  return (
    <DivFooter>
      <LabelFooter>©️ Abraão Araujo 2023</LabelFooter>
    </DivFooter>
  );
};
