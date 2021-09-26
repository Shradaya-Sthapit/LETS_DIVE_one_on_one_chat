import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function PrivateRoute({ component: Component, ...rest }) {
    const[state,dispatch] = useStateValue();
    return (
    <Route
      {...rest}
      render={(props) =>
        // console.log(props)
        localStorage.getItem('props') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;