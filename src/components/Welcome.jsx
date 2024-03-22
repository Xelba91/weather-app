import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container className="text-white">
      <Row className="mt-5">
        <Col>
          <h1 className="display-4 my-4" style={{ fontWeight: "bold" }}>
            Xelba Meteo
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
