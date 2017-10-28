import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return (
      <div className="row">
        <div className="span12">
          <div className="hero-unit center">
            <h1>
              Page Not Found 404{' '}
              <small>
                <font color="red">Error 404</font>
              </small>
            </h1>
            <br />
            <p>
              The page you requested could not be found
            </p>
            <p>
              <b>Press the button to return to the HOME page</b>
            </p>
            <Link to="/" className="btn btn-large btn-info">
              <i className="icon-home icon-white" /> Take Me Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
