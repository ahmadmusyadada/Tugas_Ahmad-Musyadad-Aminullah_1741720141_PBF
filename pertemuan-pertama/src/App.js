import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Table } from 'react-bootstrap'

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Pertemuan Pertama</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home" active>Home</Nav.Link>
                <Nav.Link href="#link">Features</Nav.Link>
                <Nav.Link href="#link">Pricing</Nav.Link>
                <Nav.Link href="#link" disabled>Disabled</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </header>
      
      <img src={logo} className="App-logo" alt="logo" />
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Yiren</td>
            <td>Emmanuel</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
      </header>
    </div>
  );
}

export default App;