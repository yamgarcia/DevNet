import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import { getPost } from "../../actions/post";
import { Link } from "react-router-dom";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return (
    <>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to='/posts' className='btn'>
            Back
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
        </>
      )}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
