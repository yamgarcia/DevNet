import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
} from "../actions/types";

/**
 * @param profile When logged in, it'll hold all the profile data, or other users
 * @param profiles Array for profile listing pages. State of devs list.
 * @param repos Holds the data for Github repositories
 * @param loading Same as in auth reducer. True by default, changes to false once a request is made
 * @param error hold any error object in the request
 */
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
