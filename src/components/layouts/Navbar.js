import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = (props) => {
    Navbar.defaultProps = {             //default props
        title : 'Github Finder',
        icon : 'fa fa-github'
      };

    Navbar.propTypes = {                  //typechecking props
        title : PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired
    };

    return(
            <div className="navbar bg-primary">
                <h1>
                    <i className={props.icon}></i> {props.title}
                </h1>
            </div>
        );
    }
export default Navbar;