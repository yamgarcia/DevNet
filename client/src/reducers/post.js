import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types";

/**
 *  @name posts array of posts
 *  @name post current post. Null by default
 *  @name loading same as in auth reducer. True by default, changes to false once a request is made
 *  @name error hold any error object in the request
 */
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_LIKES:
      //! fix action POST_ERROR firing
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
