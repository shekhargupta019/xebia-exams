import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  state = { userName: "", password: "" };

  resetData() {
    this.setState({ userName: "", password: "" });
  }

  onSubmit = (e) => {
    const { userName, password } = this.state;
    e.preventDefault();
    this.props.logIn(userName, password);
    this.resetData();
  };

  onReset = (e) => {
    e.preventDefault();
    this.resetData();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderWelcomeScreen() {
    return (
      <div className="row bg-secondary bg-light" style={{ padding: 15 }}>
        <div>
          <div className="card-content">
            <span className="card-title">
              Welcome <b>{this.props.auth.name}</b>
            </span>
            <p>In this app you can search for your favourite planets</p>
          </div>
          <div className="card-action">
            <Link to="search">Search Planet</Link>
          </div>
        </div>
      </div>
    );
  }

  renderErr() {
    const { err } = this.props;
    return err ? (
      <div className="p-3 mb-2 bg-danger text-white">{err}</div>
    ) : null;
  }

  render() {
    if (this.props.auth) {
      return this.renderWelcomeScreen();
    }

    return (
      <>
        {this.props.progress && (
          <div style={{ textAlign: "center" }}>
            <h4>Please Wait:</h4>
            <div className="spinner-border text-primary"></div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center text-info">Sign In</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <label for="userName">User Name</label>
                      <input
                        name="userName"
                        className="form-control"
                        placeholder="User Name"
                        onChange={this.onChange}
                        value={this.state.userName}
                      />
                    </div>
                    <label for="inputPassword">Password</label>
                    <div className="form-label-group">
                      <input
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                    </div>
                    <br />
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      disabled={
                        !(
                          this.state.userName.length > 0 &&
                          this.state.password.length > 0
                        )
                      }
                      onClick={this.onSubmit}
                    >
                      Sign in
                    </button>
                  </form>
                  <div>
                    <br />
                    <p className="text-primary">You can login using</p>
                    <span>
                      UserName: <b>Luke Skywalker</b>
                    </span>
                    &nbsp;&nbsp;
                    <span>
                      Password: <b>19BBY</b>
                    </span>
                  </div>
                  {this.renderErr()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
