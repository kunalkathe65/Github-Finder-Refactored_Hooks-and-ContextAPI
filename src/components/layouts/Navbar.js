import React ,{Component} from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component{
    static defaultProps = {             //default props
        title : 'Github Finder',
        icon : 'fa-github'
      };

    static propTypes = {                  //typechecking props
        title : PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired
    };

    render(){
        return(
            <div className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </div>
        );
    }
}
export default Navbar;