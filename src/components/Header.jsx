import { Navbar, Container, Nav, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="mb-3">
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Тестовое задание</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="mx-3">
              <Button>Главная</Button>
            </Link>
            <Link to="/all-candidates" className="header-nav-btn">
              <Button>Все кандидаты</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
