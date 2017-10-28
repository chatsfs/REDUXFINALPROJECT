import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  renderCategory() {
    const { categories } = this.props;

    if (categories !== 'undefined') {
      return categories.map(cate => (
        <div className="col-sm-3" key={cate.path}>
          <Link to={{ pathname: `/${cate.path}` }} className="category-margin">
            {cate.name}
          </Link>
        </div>
      ));
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <Link to="/" className="category-margin">
              index
            </Link>
          </div>
          {this.renderCategory()}
        </div>
      </div>
    );
  }
}

export default Nav;
