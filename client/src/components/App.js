import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Landing from "./Landing";
import Search from "./Search";

class App extends Component {
  state = { auth: null, err: "", progress: false };

  logIn = async (userName, password) => {
    this.setState({ err: "", progress: true });

    try {
      const response = await axios.post("/api/auth", {
        userName,
        password,
      });

      this.setState({ auth: response.data, progress: false });
    } catch (err) {
      this.setState({ err: "Invalid username or password", progress: false });
    }
  };

  logOut = () => {
    this.setState({ auth: null });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header auth={this.state.auth} logOut={this.logOut} />
            <Route
              exact
              path="/"
              render={(props) => (
                <Landing
                  {...props}
                  logIn={this.logIn}
                  auth={this.state.auth}
                  err={this.state.err}
                  progress={this.state.progress}
                />
              )}
            />
            <Route exact path="/search" component={Search} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
