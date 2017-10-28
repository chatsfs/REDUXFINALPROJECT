import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';

import { editComment } from './../actions/action_comments';

class CommentEdit extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { post_id, category } = this.props.match.params;
    const { comment_id } = this.props.match.params;
    const values = serializeForm(event.target, { hash: true });
    values['timestamp'] = Date.now();

    this.props.editComment(values, comment_id, () => {
      this.props.history.push(`/${category}/${post_id}`);
    });
  };

  render() {
    const { post_id, category } = this.props.match.params;
    const { comment } = this.props;

    return (
      <div>
        <h1 className="project-title">Readable[Comment_Edit]</h1>
        <Link to={`/${category}/${post_id}`}>Back To Detail</Link>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="form-group">
            <label htmlFor="body">Comment:</label>
            <input
              type="text"
              className="form-control a-margin"
              name="body"
              id="body"
              defaultValue={comment['body']}
              ref={input => {
                this.bodyInput = input;
              }}
            />
          </div>
          <button className="a-margin btn btn-info">Edit Comment</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ comments }, ownProps) {
  return { comment: comments[ownProps.match.params.comment_id] };
}

export default connect(mapStateToProps, {
  editComment
})(CommentEdit);
