import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="bg-info">
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <Link className="navbar-brand" to="/" style={{ marginLeft: 40 }}>
            Star Wars
          </Link>
          <div className="collapse navbar-collapse" style={{ marginLeft: 750 }}>
            <div className="navbar-nav">
              {!this.props.auth ? (
                <Link to="/" className="nav-item nav-link active">
                  Login
                </Link>
              ) : (
                <Link
                  to="/"
                  className="nav-item nav-link active"
                  onClick={this.props.logOut}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
