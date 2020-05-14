import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./component/ProtectedRoute";
import Admin from "./component/Admin";
import Login from "./actions/Login";
import MainPage from "./container/mainPage";
import Category from "./container/Category";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
    <ProtectedRoute exact path="/admin" component={Admin} isAuthenticated={isAuthenticated} isVerifying={isVerifying}/>
    <Route path="/login" component={Login} />
    <Route path="/category" component={Category} />
    <Route path="/" component={MainPage} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);