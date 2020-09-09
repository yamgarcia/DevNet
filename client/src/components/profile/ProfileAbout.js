import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <>
      <div className='profile-about bg-light p-2'>
        {bio && (
          <>
            <h2 className='text-primary'>
              {name.split("")[name.length - 1] !== "s"
                ? name.trim().split(" ")[0] + "'"
                : name.trim().split(" ")[0] + "'s"}{" "}
              Bio
            </h2>
            <p>{bio}</p>
            <div className='line'></div>
          </>
        )}
        <h2 className='text-primary'>Skill Set</h2>
        <div className='skills'>
          {skills.map((skill, i) => (
            <div key={i} className='p-1'>
              <i className='fas fa-check'></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
