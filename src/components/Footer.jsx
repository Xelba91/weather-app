import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="footer border-top border-white text-center text-white mt-5"
      style={{ bottom: 0, width: "100%" }}
    >
      <p className="m-0 py-3">&copy; 2024 Xelba Meteo</p>
    </Container>
  );
};

export default Footer;
