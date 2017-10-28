import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';

import { editPost } from './../actions/action_posts';

class PostEdit extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { back, post_id } = this.props.match.params;
    const values = serializeForm(event.target, { hash: true });
    values['timestamp'] = Date.now();

    this.props.editPost(values, post_id, () => {
      this.props.history.push(this.transformURL(back));
    });
  };

  transformURL(back) {
    const { category, post_id } = this.props.match.params;

    if (back === 'index') return '/';
    else if (back === 'cate') return `/${category}`;
    else if (back === 'detail') return `/${category}/${post_id}`;
  }

  render() {
    const { post } = this.props;
    const { back } = this.props.match.params;

    return (
      <div>
        <h1 className="project-title">Readable[Post_Edit]</h1>
        <Link to={this.transformURL(back)}>Back To Detail</Link>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control a-margin"
              name="title"
              id="title"
              defaultValue={post['title']}
              ref={input => {
                this.titleInput = input;
              }}
            />
            <label htmlFor="body">Post:</label>
            <input
              type="text"
              className="form-control a-margin"
              name="body"
              id="body"
              defaultValue={post['body']}
              ref={input => {
                this.bodyInput = input;
              }}
            />
          </div>
          <button className="a-margin btn btn-info">Edit Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, categoryPosts }, ownProps) {
  const { post_id, back } = ownProps.match.params;
  if (back !== 'cate') return { post: posts[post_id] };
  else return { post: categoryPosts[post_id] };
}

export default connect(mapStateToProps, {
  editPost
})(PostEdit);
