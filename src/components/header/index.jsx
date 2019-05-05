import React, { Component } from 'react';
import './style.css';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
	logOut() {
		if (localStorage.getItem('authToken')) {
			localStorage.removeItem('authToken');
			this.props.history.push('/login');
		}
	}
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
					<button className="item btn-danger" onClick={() => this.logOut()}>
						Logout
					</button>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
