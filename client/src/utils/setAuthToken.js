import axios from "axios";
/**
 * @param token
 * Function takes a token, if there is one it will be added to the header,
 *  if not it will delete from the 'global' headers
 */

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
