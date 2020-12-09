import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigator({ nomeDecisione }) {
  return (
    <Navbar bg="light">
      <Navbar.Brand as={NavLink} to="/">
        Be Prometeo
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/attuale">
          {nomeDecisione}
        </Nav.Link>
        <Nav.Link as={NavLink} to="/lista-decisioni">
          Decisioni
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

Navigator.propTypes = {
  nomeDecisione: PropTypes.string.isRequired,
};

export default Navigator;
