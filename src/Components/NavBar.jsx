import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar className="navbar" size ="sm" style={{height:"10vh"}}>
      <Container fluid>
        <img className="trello-logo"
          src={
            "https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif"
          }
          alt=""
        />
        <Link className="navbar-home" to="/">
          Home
        </Link>


        
      </Container>
    </Navbar>
  );
}

export default NavBar;
