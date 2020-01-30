import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    
    render() {      
      	return (
      		<div className="header">
	      		<Nav>
	      			<NavItem>
		      			<NavLink className="nav-link" to="/login">
		      				<span>Login</span>
		      			</NavLink>
	      			</NavItem>

	      			<NavItem>
		      			<NavLink className="nav-link" to="/signup">
		      				<span>Signup</span>
		      			</NavLink>
	      			</NavItem>

	      			<NavItem>
		      			<NavLink className="nav-link" exact to="/card">
		      				<span>Card</span>
		      			</NavLink>
	      			</NavItem>     			
	      		</Nav>
      		</div>
        );
    }
}

export default Header;