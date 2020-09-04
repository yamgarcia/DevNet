import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

/**
 * @description Get posts
 */
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText + " - GET_POSTS error - getPosts",
        status: err.response.status,
      },
    });
  }
};

/**
 * @description add like
 */

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText + " - UPDATE_LIKES error - addLike",
        status: err.response.status,
      },
    });
  }
};

/**
 * @description remove like
 */

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText + " - UPDATE_LIKES error - removeLike",
        status: err.response.status,
      },
    });
  }
};
