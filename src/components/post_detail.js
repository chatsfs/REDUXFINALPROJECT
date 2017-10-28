import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import _ from 'lodash';

import { _uuid } from '../utils/helpers';
import PageNotFound from './page_not_found';
import * as actionComments from './../actions/action_comments';
import { fetchPost, deletePost, vote } from './../actions/action_posts';
import CommentsView from './comments_view';
import { fetchCategories } from './../actions/action_categories';
import Nav from './nav';

class PostDetail extends Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.fetchPost(post_id);
    this.props.fetchComments(post_id);
    this.props.fetchCategories();
  }

  onDeleteClick() {
    const { post_id } = this.props.match.params;
    this.props.deletePost(post_id, () => {
      this.props.history.push('/');
    });
  }

  onVote(postId, option) {
    this.props.vote(postId, option, () => {
    });
  }

  deleteCommentClick(commentId) {
    this.props.deleteComment(commentId, () => {
    });
  }

  voteComment(commentId, option) {
    this.props.commentVote(commentId, option, () => {
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { post_id } = this.props.match.params;
    const values = serializeForm(event.target, { hash: true });
    values['parentId'] = post_id;
    values['id'] = _uuid();
    values['timestamp'] = Date.now();

    this.bodyInput.value = '';
    this.authorInput.value = '';
    this.props.addComment(values, () => {});
  };

  orderBy = attr => {
    this.props.commOrderBy(attr);
  };

  render() {
    const { post, comments, categories } = this.props;
    const { post_id, category } = this.props.match.params;

    if (!post || post.deleted === true) {
      return <PageNotFound />;
    }

    return (
      <div>
        <h1 className="project-title">Readable[Detail]</h1>
        <h2 className="category-title">Menu</h2>
        <Nav categories={categories} />
        <br />
        <br />
        <button
          className="btn btn-danger pull-xs-right a-margin"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
        <Link
          className="btn btn-primary pull-xs-right"
          to={`/posts/edit/${post.category}/${post.id}/detail`}
        >
          EDIT
        </Link>
        <br />
        <br />
        <h3>Title: {post.title}</h3>
        <h6>Body: {post.body}</h6>
        <h6>Author: {post.author}</h6>
        <h6>Comments: {_.keys(comments).length}</h6>
        <h6>Score: {post.voteScore}</h6>
        <h6>
          Vote:<button
            className="btn-link"
            onClick={event => this.onVote(post.id, 'upVote')}
          >
            Up
          </button>
          <button
            className="btn-link a-margin"
            onClick={event => this.onVote(post.id, 'downVote')}
          >
            Down
          </button>
        </h6>
        <hr />
        <h5>
          Comments sorting by:{' '}
          <button
            className="btn btn-link"
            onClick={() => this.orderBy('timestamp')}
          >
            Date
          </button>
          <button
            className="btn btn-link a-margin"
            onClick={() => this.orderBy('voteScore')}
          >
            Score
          </button>
        </h5>
        <CommentsView
          comments={comments}
          onDeleteClick={this.deleteCommentClick.bind(this)}
          onVote={this.voteComment.bind(this)}
          category={category}
          postId={post_id}
        />
        <hr />
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="body">Comment:</label>
            <input
              type="text"
              className="form-control a-margin"
              name="body"
              id="body"
              ref={input => {
                this.bodyInput = input;
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author" className="a-margin">
              Author:
            </label>
            <input
              type="text"
              className="form-control a-margin"
              name="author"
              id="author"
              ref={input => {
                this.authorInput = input;
              }}
            />
          </div>
          <button className="a-margin btn btn-info">Add Comment</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, categories }, ownProps) {
  return {
    post: posts[ownProps.match.params.post_id],
    posts,
    comments,
    categories
  };
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPost,
  deletePost,
  vote,
  fetchComments: actionComments.fetchComments,
  commentVote: actionComments.commentVote,
  deleteComment: actionComments.deleteComment,
  addComment: actionComments.addComment,
  commOrderBy: actionComments.commOrderBy
})(PostDetail);
