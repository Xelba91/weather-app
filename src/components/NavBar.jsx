import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  console.log("LOCATION", location);

  return (
    <Navbar expand="lg" className="navbar bg-body-transparent border-bottom border-white">
      <Container fluid="xl">
        <Navbar.Brand style={{ color: "white" }}>
          {/* gif trovata googlando meteo.gif :P */}
          <img
            src="https://www.supercolors.it/wp-content/uploads/2017/09/tempo-2.gif"
            alt="gif"
            width="100px"
            className="img-fluid border-rounded-2 shadow-lg me-3"
            style={{
              borderRadius: "10px",
            }}
          />
          Xelba - Meteo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link text-white">
              Home
            </NavLink>
            <NavLink to="/five-day" className="nav-link text-white">
              Cerca la tua città
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
