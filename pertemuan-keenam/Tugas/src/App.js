import React from 'react';
import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function AuthExample() {
  return (
    <Router>
      <div>
      {/* <NavigationBar/> */}
      {/* <AuthButton/> */}
        <ul className="navbar">
          <li className="navbar2">
            <a><Link to="/public">Public Page</Link></a>
          </li>
          <li className="navbar2">
            <a><Link to="/private">Private Page</Link></a>
          </li>
          <li className="navbar2">
            <a><Link to="/topics">Topic Page</Link></a>
          </li>
          <li className="navbar3">
            <a><Link to="/login"><AuthButton/></Link></a>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/topics">
            <Topics/>
          </Route>
          <PrivateRoute path="/private">
            <ProtectedPage/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

// function NavigationBar(){
//   return(
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="/public">Home</Nav.Link>
//             <Nav.Link href="/topics">Kategori</Nav.Link>
//             <Nav.Link href="/private">Keranjang</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav.Link href="/login"><AuthButton/></Nav.Link>
//         </Navbar.Collapse>
//       </Navbar>
//   )
// }

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb){
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb){
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton(){
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}>
          Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in. Click Here</p>
  )
}

function PrivateRoute({children, ...rest}){
  return (
    <Route
      {...rest}
      render = {({location}) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to = {{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )}
    />
  )
}

function PublicPage(){
  return <h3>Public</h3>;
}

function ProtectedPage(){
  return <h3>Private</h3>;
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let {from} = location.state || {from: {pathname: "/"}};
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      {/* <p>You must log in to view the page</p> */}
      
      <button onClick={login}>Log in</button>
    </div>
  )
}

// function Child() {
//   let {id} = useParams();

//   return(
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// }

function Home(){
  return(
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics(){
  let { path, url } = useRouteMatch();
  return(
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/Sate, Nasi Goreng`}>Kuliner</Link>
        </li>
        <li>
          <Link to={`${url}/Wisata alam, Museum`}>Travelling</Link>
        </li>
        <li>
          <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic/>
        </Route>
      </Switch>
    </div>
  );
}

function Topic(){
  let {topicId} = useParams();

  return(
    <div>
      <h3>{topicId}</h3>
    </div>
  )
}

// function About(){
//   return(
//     <div>
//       <h2>About</h2>
//     </div>
//   )
// }

// function Dashboard(){
//   return(
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   )
// }