import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <button
        onClick={() => {
          deleteExperience(exp._id);
        }}
        className='btn btn-danger'
      >
        Delete
      </button>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Expperience Credentials</h2>
      <table className='table'>
        <thead>
          <th>Company</th>
          <th className='hide-sm'>Title</th>
          <th className='hide-sm'>Years</th>
          <th />
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
