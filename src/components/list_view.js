import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListView extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    back: PropTypes.string.isRequired
  };

  renderPost() {
    const { posts, onDeleteClick, onVote, back } = this.props;
    return _.map(posts, post => {
      if (!post.deleted && post.id !== undefined) {
        return (
          <li className="list-group-item" key={post.id}>
            <Link to={`/${post.category}/${post.id}`}>Title:{post.title}</Link>
            <span className="span-margin">|Author:{post.author}</span>
            <span className="span-margin">|Comments:{post.commNum}</span>
            <span className="span-margin">|Score:{post.voteScore}</span>
            <span className="span-margin">
              |Vote:<button
                className="btn-link"
                onClick={event => onVote(post.id, 'upVote')}
              >
                Up
              </button>
              <button
                className="btn-link a-margin"
                onClick={event => onVote(post.id, 'downVote')}
              >
                Down
              </button>
            </span>
            <div className="text-xs-right">
              <Link
                className="btn btn-primary"
                to={`/posts/edit/${post.category}/${post.id}/${back}`}
              >
                EDIT
              </Link>

              <button
                className="btn btn-danger a-margin"
                onClick={event => onDeleteClick(post.id)}
              >
                DELETE
              </button>
            </div>
          </li>
        );
      }
    });
  }

  render() {
    return <ul className="list-group">{this.renderPost()}</ul>;
  }
}

export default ListView;
