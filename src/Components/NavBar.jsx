import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar className="navbar">
      <Container fluid>
        <img className="trello-logo"
          src={
            "https://seeklogo.com/images/T/trello-logo-45ABCC6452-seeklogo.com.png"
          }
          alt=""
        />
        <Link className="navbar-home" to="/">
          Home
        </Link>


        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" style={{ color: "white" }}>
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
