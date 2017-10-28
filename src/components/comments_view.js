import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  };

  renderComment() {
    const { comments, onDeleteClick, onVote, postId, category } = this.props;
    return _.map(comments, comment => {
      if (!comment.deleted) {
        return (
          <li className="list-group-item" key={comment.id}>
            <span className="span-margin">{comment.body}</span>
            <span className="span-margin">|Author:{comment.author}</span>
            <span className="span-margin">|Score:{comment.voteScore}</span>
            <span className="span-margin">
              |Vote:<button
                className="btn-link"
                onClick={event => onVote(comment.id, 'upVote')}
              >
                Up
              </button>
              <button
                className="btn-link a-margin"
                onClick={event => onVote(comment.id, 'downVote')}
              >
                Down
              </button>
            </span>
            <div className="text-xs-right">
              <Link
                className="btn btn-primary"
                to={`/comment/edit/${category}/${postId}/${comment.id}`}
              >
                EDIT
              </Link>

              <button
                className="btn btn-danger a-margin"
                onClick={event => onDeleteClick(comment.id)}
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
    return <ul className="list-group">{this.renderComment()}</ul>;
  }
}

export default CommentsView;
