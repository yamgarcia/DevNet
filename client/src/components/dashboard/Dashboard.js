import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

/**
 * @description Fetch data using an actions, bring it from the redux state, and pass it to other components (exp, edu)
 * racfp
 */
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile(); //can't use this if it's not brought in the props above
  }, [getCurrentProfile]);

  return (
    <>
      {loading && profile === null ? <Spinner /> : <> </>}
      <h1 className='large text-primary'> Dashboard </h1>
      <p className='lead'>
        {" "}
        <i className='fas fa-user'></i> Welcome {user && user.name}{" "}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => {
                deleteAccount();
              }}
            >
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <p style={{ textAlign: "center" }}>
            You have not setup a profile.
            <br />
            Please add your information
            <br />
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </p>{" "}
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired, //ptfr
  deleteAccount: PropTypes.func.isRequired, //ptrf
  auth: PropTypes.object.isRequired, //ptor
  profile: PropTypes.object.isRequired, //ptor
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
