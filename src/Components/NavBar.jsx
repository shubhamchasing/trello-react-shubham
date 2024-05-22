import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function NavBar() {
  return (
    <Navbar className="navbar" size="sm" style={{ height: "10vh" }}>
      <Container fluid>
        <Link className="navbar-home" to="/">
          <img
            className="trello-logo w-25"
            src={
              "https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif"
            }
            alt=""
          />{" "}
        </Link>
        <Link className="navbar-home" to="/">
          Home
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
