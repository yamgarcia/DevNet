import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

/**
 *
 * @param {string} msg messege the alert will show on the screen
 * @param {string} alertType tells the frontend the kind of alert
 * @param {number} timeout setted to 5000 by default it hold how many ms to the alert disappear
 */
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
