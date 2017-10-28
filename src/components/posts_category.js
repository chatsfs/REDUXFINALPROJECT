import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as actionCategoryPosts from './../actions/action_categoryPosts';
import { fetchCategories } from './../actions/action_categories';
import ListView from './list_view';
import Nav from './nav';

class PostsCategory extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
    this.curCategory = null;
    this.preCategory = null;
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
    this.props.fetchCategories();
    this.flag = false;
    this.curCategory = category;
  }

  componentWillReceiveProps(nextProps) {
    const { category } = this.props.match.params;

    const nextCategory = nextProps.match.params.category;

    if (nextCategory !== category) {
      this.props.fetchCategoryPosts(nextCategory);
      this.flag = false;
      this.curCategory = category;
    }
  }

  deleteClick(postId) {
    this.props.deletePost(postId, () => {
      this.props.history.push('/');
    });
  }

  vote(postId, option) {
    this.props.cateVote(postId, option, () => {
    });
  }

  orderBy = attr => {
    this.props.cateOrderBy(attr);
  };

  combCommentNum(posts) {
    const postKeys = _.keys(posts);
    _.forEach(postKeys, key => {
      this.props.fetchCateCommentsMa(key);
    });
  }

  render() {
    const { category } = this.props.match.params;
    const { categoryPosts, categories } = this.props;
    const backURL = `/posts/new/${category}`;

    if (!_.isEmpty(categoryPosts) && this.flag === false) {
      if (this.preCategory !== this.curCategory) {
        this.combCommentNum(categoryPosts);
        this.flag = true;
        this.preCategory = category;
      }
    }

    return (
      <div>
        <h1 className="project-title">Readable</h1>
        <h2 className="category-title">Menu</h2>
        <Nav categories={categories} />
        <br />
        <br />
        <h2 className="category-title">Category [{category}] Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to={backURL}>
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
          posts={categoryPosts}
          onDeleteClick={this.deleteClick.bind(this)}
          onVote={this.vote.bind(this)}
          back={'cate'}
        />
      </div>
    );
  }
}

function mapStateToProps({ categoryPosts, categories }) {
  return { categoryPosts, categories };
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCategoryPosts: actionCategoryPosts.fetchCategoryPosts,
  deletePost: actionCategoryPosts.deletePost,
  cateVote: actionCategoryPosts.cateVote,
  cateOrderBy: actionCategoryPosts.cateOrderBy,
  fetchCateCommentsMa: actionCategoryPosts.fetchCateCommentsMa
})(PostsCategory);
