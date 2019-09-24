import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: [],
    repos: [],
    loading: false
  };

  let githubClientId;
  let githubClientSecret;

  if (process.env.NODE_ENV !== "production") {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //defining all our methods in here
  //search users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}
                                &client_secret=${githubClientSecret}`); //making request to Github API
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  //get single user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}
                                &client_secret=${githubClientSecret}`); //making request to Github API
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //get a public repos of user
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
                                &client_secret=${githubClientSecret}`); //making request to Github API
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //clear users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
