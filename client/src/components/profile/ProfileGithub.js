import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGitHubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(username);
  }, [getGitHubRepos, username]);
  return (
    <>
      <div className='profile-github'>
        <h2 className='text-primary my-1'>Github Repos</h2>
        {repos === null ? (
          <Spinner />
        ) : (
          repos.map((repo) => (
            <div key={repo._id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repos.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repos.watchers_count}
                  </li>
                  <li className='badge badge-light'>
                    Forks: {repos.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
