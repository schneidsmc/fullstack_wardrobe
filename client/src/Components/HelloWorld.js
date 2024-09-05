import React from 'react';
import { Container, Navbar, Nav, Row, Col, Button, Card, Image } from 'react-bootstrap';
import "./ComponentStyling/HelloWorld.css"

const HelloWorld = () => {
    const handleGetStartedClick = () => {
        console.log('Get Started button clicked!');
    };
    
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">
            <img src="/wardrobe.png" alt="Outfit Planner Logo" className="logo-img" />
            Outfit Planner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="hero-section text-center text-white">
        <Container>
          <h1 className="display-3">Your Ultimate Outfit Planner</h1>
          <p className="lead mb-4">
            Effortlessly plan and organize your outfits with our intuitive app.
          </p>
          <Button variant="light" size="lg" href="#get-started" onClick={handleGetStartedClick} >Get Started</Button>
        </Container>
      </Container>

      <Container id="features" className="my-5">
        <h2 className="text-center mb-5">Our Features</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center mb-4 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="font-weight-bold">Clothing Catalog</Card.Title>
                <Card.Text>
                Create a digital catalog of your clothing items 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="font-weight-bold">Mix and Match</Card.Title>
                <Card.Text>
                  Virtually create and save outfits
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="font-weight-bold">Organizational Tags</Card.Title>
                <Card.Text>
                  Categorize items by type, color, seasonality, and occasion
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer bg-dark text-white text-center py-3">
        <Container>
          <p className="mb-0">&copy; 2024 Outfit Planner. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default HelloWorld;