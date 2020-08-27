import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
        {!to ? " Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {degree}
      </p>
      <p>
        <strong>Field of Stuudy: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
