import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// import {
//   fetchCategories,
//   fetchPosts,
//   deletePost,
//   vote,
//   orderBy,
//   fetchCommentsMa
// } from './../actions';

import { fetchCategories } from './../actions/action_categories';

// import { fetchPosts,
//     deletePost,
//     vote,
//     orderBy,
//     fetchCommentsMa
// } from './../actions/action_posts'

import * as actionPosts from './../actions/action_posts';
import ListView from './list_view';
import Nav from './nav';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
  }

  componentDidMount() {
    this.flag = false;
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  deleteClick(postId) {
    this.props.deletePost(postId, () => {
      this.props.history.push('/');
    });
  }

  vote(postId, option) {
    this.props.vote(postId, option, () => {
    });
  }

  orderBy = attr => {
    this.props.orderBy(attr);
  };

  combCommentNum(posts) {
    const postKeys = _.keys(posts);
    _.forEach(postKeys, key => {
      this.props.fetchCommentsMa(key);
    });
  }

  render() {
    const { posts, categories } = this.props;

    if (!_.isEmpty(posts) && this.flag === false) {
      this.combCommentNum(posts);
      this.flag = true;
    }

    return (
      <div>
        <h1 className="project-title">Readable</h1>
        <h2 className="category-title">Menu</h2>
        <Nav categories={categories} />
        <br />
        <br />
        <h2 className="category-title">All Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new/index">
            Add A Post
          </Link>
        </div>
        <h5>
          Posts sorting by:{' '}
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
        <ListView
          posts={posts}
          onDeleteClick={this.deleteClick.bind(this)}
          onVote={this.vote.bind(this)}
          back="index"
        />
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return { categories, posts };
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts: actionPosts.fetchPosts,
  deletePost: actionPosts.deletePost,
  vote: actionPosts.vote,
  orderBy: actionPosts.orderBy,
  fetchCommentsMa: actionPosts.fetchCommentsMa
})(PostsList);
