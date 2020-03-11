import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function ParamsExample() {
  return (
    <Router>
      <div>
        <h2>Accounts</h2>
        <ul>
          <li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/gmail">Gmail</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/amazon">Amazon</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:id" children={<Child/>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

function Child() {
  let {id} = useParams();

  return(
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

// function Home(){
//   return(
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

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