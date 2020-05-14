import React, { Component } from 'react';
import { useRouteMatch, Switch, Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

const Category = (props) => {
        const {
            isLoggingOut, logoutError, isAuthenticated
        } = props;

        const handleLogout = () => {
            const { dispatch } = props;
            dispatch(logoutUser());
        };

        let { path, url } = useRouteMatch();

        return(
          <div>
              <ul className="navbar">
                        <li className="navbar2">
                            <a><Link to="/" >Home Page</Link></a>
                        </li>
                        { isAuthenticated && 
                            <li className="navbar2">
                                <a><Link to="/admin">Admin Page</Link></a>
                            </li>
                        }
                        
                        <li className="navbar3">
                                {isAuthenticated ? (
                                <p>
                                    Welcome!{"user"}
                                    <button
                                    onClick={handleLogout}>Logout</button>
                                    { isLoggingOut && <p>Logging Out....</p> }
                                    { logoutError && <p>Error logging out</p> }
                                </p>
                                ) : (
                                <p>You are not logged in. 
                                    <Link to="/login"> Click here</Link>
                                </p>
                                )}
                        </li>
                    </ul>
            <h2>Category</h2>
            <ul>
              <li>
                <Link to={`${url}/Music Video`}>Music Video</Link>
              </li>
              <li>
                <Link to={`${url}/Concert`}>Concert</Link>
              </li>
              <li>
                <Link to={`${url}/Live`}>Live</Link>
              </li>
            </ul>
      
            <Switch>
              <Route exact path={path}>
                <h3>Please select.</h3>
              </Route>
              <Route path={`${url}/Music Video`}/>
              <Route path={`${url}/Concert`}/>
              <Route path={`${url}/Live `}/>
            </Switch>
          </div>
        );
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Category);