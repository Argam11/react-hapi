import React, { Component } from 'react';
import './style.css';

import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<header className="App_header">
				<div className="menu">
					<Link to="/">
						<div className="item btn-success">Home</div>
					</Link>
					<Link to="/companies">
						<div className="item btn-primary">Companies</div>
					</Link>
					<Link to="/employees">
						<div className="item btn-primary">Employees</div>
					</Link>
					<Link to="/login">
						<div className="item btn-success">Login</div>
					</Link>
					<Link to="/logout">
						<div className="item btn-danger">Logout</div>
					</Link>
				</div>
			</header>
		);
	}
}

export default Header;
