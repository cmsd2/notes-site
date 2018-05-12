import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../Auth";

export default withAuth(({ component: C, auth, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated()
            ? <C {...props} {...cProps} />
            : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
  />);
