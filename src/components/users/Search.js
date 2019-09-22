import React, { Component } from "react";
import PropTypes from "prop-types";
class Search extends Component {
  //Component level state
  state = {
    text: ""
  };

  PropTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            value={this.state.text}
            placeholder="Search Github User"
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
