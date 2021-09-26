import React from "react";
import { Switch, Route } from "react-router-dom";
import Sineup  from "./components/Sineup";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Sineup} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
    </Switch>
  );
}

export default Routes;