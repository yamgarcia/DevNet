import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//the span arround the text is to let just the icon to show in mobile devices

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='/login'>
          <i className='fas fa-sing-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      {" "}
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevNet
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired, //ptfr
  auth: PropTypes.object.isRequired, //ptor
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
