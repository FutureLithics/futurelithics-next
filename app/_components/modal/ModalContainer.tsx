import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

//import Login from "./modalFragments/Login";
//import Register from "./modalFragments/Register";
import Alert from "./modalFragments/Alert";

interface ModalContainerProps {
    modalOpen: boolean,
    setModalOpen: (open: boolean) => void,
    type: string,
    response: any
}

const ModalContainer: React.FC<ModalContainerProps> = (props) => {
  const { modalOpen, setModalOpen, type, response } = props;

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const modalSwitch = (type: string) => {
    switch (type) {
      case "alert":
        return <Alert toggle={toggle} response={response} />;
      default:
        return <p>Not a Valid Modal Type</p>;
    }
  };

  const headerText = () => {
    if (type == "alert" && response.title != undefined) {
      return response.title;
    } else {
      return type;
    }
  };

  return (
    <Modal show={modalOpen} onHide={() => toggle()} style={{ top: "20vh" }}>
      <Modal.Header closeButton>
        {capitalize(headerText())}
      </Modal.Header>
      <Modal.Body>{modalSwitch(type)}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;