import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from './../actions/action_posts';
import { _uuid } from '../utils/helpers';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  renderSelField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option value="">Select a category...</option>
          {this.props.categories.map(category => (
            <option value={category.name} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    values['id'] = _uuid();
    values['timestamp'] = Date.now();
    const { back } = this.props.match.params;
    this.props.createPost(values, () => {
      if (back === 'index') {
        this.props.history.push('/');
      } else {
        this.props.history.push(`/${back}`);
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { back } = this.props.match.params;
    let backURL = '';
    if (back === 'index') backURL = '/';
    else backURL = `/${back}`;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field label="Post Content" name="body" component={this.renderField} />
        <Field label="Author" name="author" component={this.renderField} />
        <Field
          label="Categories"
          name="category"
          component={this.renderSelField.bind(this)}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={backURL} className="btn btn-danger a-margin">
          Cancel
        </Link>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter the title that is least 3 charaters!';
  }

  if (!values.body) {
    errors.body = 'Enter some content please!';
  }

  if (!values.author) {
    errors.author = 'Enter the author please!';
  }

  if (!values.category) {
    errors.category = 'Select the category!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { createPost })(PostsNew)
);
