import React from "react";
import styled from "styled-components";

const LabelFooter = styled.label`
  font-size: 0.9rem;
  color: #fff;
  font-family: "Montserrat", "Arial Narrow", Arial, sans-serif;
  font-style: italic;
`;
const DivFooter = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;
`;

export const Footer = () => {
  return (
    <DivFooter>
      <LabelFooter>©️ Desenvolvido por Abraão Araujo - 2023</LabelFooter>
    </DivFooter>
  );
};
