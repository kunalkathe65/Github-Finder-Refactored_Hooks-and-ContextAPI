import React, { Fragment, Component } from "react";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    if (this.props.loading) return <Spinner />;

    return (
      <Fragment>
        <Link to="/" className="btn btn-regular">
          Back
        </Link>
        Hireable : {""}
        {hireable ? (
          <i className="fa fa-check text-success" />
        ) : (
          <i className="fa fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            {location && (
              <Fragment>
                <i className="fa fa-map-marker" />
                <p>{location}</p>
              </Fragment>
            )}
          </div>
          <div>
            {login && (
              <Fragment>
                <p>
                  <b>Username :</b> {login}
                </p>
              </Fragment>
            )}
            {bio && (
              <Fragment>
                <p>
                  <b>Bio :</b> {bio}
                </p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers : {followers}</div>
          <div className="badge badge-success">Following : {following}</div>
          <div className="badge badge-light">Public Repos : {public_repos}</div>
          <div className="badge badge-dark">Public Gists : {public_gists}</div>
        </div>
        <Repos repos={this.props.repos} />
      </Fragment>
    );
  }
}

export default User;
