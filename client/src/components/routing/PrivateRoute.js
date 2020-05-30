import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
//to interact with the auth state in the Auth reducer connect must be imported
import { connect } from "react-redux";

/**
 * @description the PrivateRoute component forces the user to another route when not Authenticated
 */
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired, //ptor
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
