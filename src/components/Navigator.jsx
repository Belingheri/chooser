import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigator({ nomeDecisione }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        Be Prometeo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/attuale">
            {nomeDecisione}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/lista-decisioni">
            Tutte le decisioni
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Navigator.propTypes = {
  nomeDecisione: PropTypes.string.isRequired,
};

export default Navigator;
