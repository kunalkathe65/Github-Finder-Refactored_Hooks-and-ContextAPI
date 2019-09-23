import React, { Fragment, Component } from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    repos: [],
    loading: false,
    alert: null,
    user: {}
  };

  //search users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); //making request to Github API
    this.setState({ users: res.data.items, loading: false });
  };

  //get a single user
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); //making request to Github API
    this.setState({ user: res.data, loading: false });
  };

  //get a public repos of user
  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); //making request to Github API
    this.setState({ repos: res.data, loading: false });
  };

  //clear users
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //set alert if search box is left empty
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    //alert msg remain only for 5sec
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />

              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
