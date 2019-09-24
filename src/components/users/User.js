import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";
import { Link } from "react-router-dom";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

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
  } = user;

  if (loading) return <Spinner />;

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
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
