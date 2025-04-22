import React from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

interface AlertProps {
    toggle: () => void,
    response: {message: string}
}

const Alert: React.FC<AlertProps> = (props) => {
  const { toggle, response } = props;

  console.log(response, "resp!");

  return (
    <Container className="text-center">
      <Row>
        <Col md={12} className="p-1">
          <p>{response.message}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="p-1">
          <Button onClick={() => toggle()} color="primary">
            Ok
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Alert;