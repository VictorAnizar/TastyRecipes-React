import * as React from "react";
// React router dom
import { Routes, Route, Outlet, Link } from "react-router-dom";
// Importing components
import Inicio from "./components/inicio/Inicio";
import Contacto from "./components/contacto/Contacto"
// Importing css
import "./styles/css/app.scss";
// Importing components from reacto bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
function BarraNavegacion() {
  return (
    <Navbar style={{background: "#374045"}}>
      <Container>
        <Navbar.Brand className="logo-texto-navbar" as={Link} to="/">Tasty recipes</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className=" justify-content-end">

          <Nav.Link as={Link} to="/"><Button style={{color: "white"}} variant="warning">Inicio</Button>{' '}</Nav.Link>
          <Nav.Link as={Link} to="/contacto"><Button  variant="outline-warning">Contacto</Button>{' '}</Nav.Link>
        </Nav>
      </Container>
      <Outlet />
    </Navbar>
  );
}

function PiePagina(){
  return (
    <div id="pie-pagina">
      Pie
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


const App = () => {
  return (
    <div>

      <BarraNavegacion />
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        {/* <Route path="/" element={<BarraNavegacion />}> */}
        <Route index element={<Inicio />} />
        <Route path="contacto" element={<Contacto />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NoMatch />} />
        {/* </Route> */}
      </Routes>
      <PiePagina />
    </div>
  );
}

export default App;
