import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = props => {
  const [text, setText] = useState("");

  const onChange = event => {
    setText(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (text === "") {
      props.setAlert("Please enter something!", "light");
    } else {
      props.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Search Github User"
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {props.showClear && (
        <button className="btn btn-light btn-block" onClick={props.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;
