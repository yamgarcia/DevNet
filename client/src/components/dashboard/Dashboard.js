import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import profile from "../../reducers/profile";
import { getCurrentProfile } from "../../actions/profile";

/**
 * @description Fetch data using an actions, bring it from the redux state, and pass it to other components (exp, edu)
 * racfp
 */
const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile(); //can't use this if it's not called in the props above
  }, []);

  return <>Dashboard</>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired, //ptfr
  auth: PropTypes.object.isRequired, //ptor
  profile: PropTypes.object.isRequired, //ptor
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
