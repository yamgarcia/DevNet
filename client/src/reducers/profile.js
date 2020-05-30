import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

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
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
