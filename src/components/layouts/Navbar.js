import React, { Component } from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";

class Navbar extends Component {
  defaultProps = {
    //default props
    title: "Github Finder",
    icon: "fa fa-github"
  };

  propTypes = {
    //typechecking props
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };
  render() {
    return (
      <div className="navbar bg-primary">
        <h1>
          <i className={this.defaultProps.icon}></i> {this.defaultProps.title}
        </h1>
      </div>
    );
  }
}
export default Navbar;
