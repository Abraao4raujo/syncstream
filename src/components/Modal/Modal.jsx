import { Outlet } from "react-router-dom";
import styled from "styled-components";

const DivModal = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TitleModal = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  list-style: none;
  font-family: system-ui;
`;

const HeaderModal = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

const Modal = ({ header, main, footer }) => {
  return (
    <div className="modalContainer">
      <HeaderModal>
        <DivModal>
          <TitleModal>{header}</TitleModal>
        </DivModal>
      </HeaderModal>
      {main}
      {footer}
    </div>
  );
};

export default Modal;
