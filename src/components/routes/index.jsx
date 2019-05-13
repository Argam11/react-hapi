import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './style.css';

import Header from '../header';

import Home from '../home';
import Login from '../login';
import Companies from '../companies';
import CreateCompany from '../companies/create';
import EditCompany from '../companies/index';
import Employees from '../employees';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('authToken') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

class Routes extends Component {
	render() {
		return (
			<Router>
				<Header />
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/companies" component={Companies} />
					<PrivateRoute path="/createCompany" component={CreateCompany} />
					<PrivateRoute path="/editCompany" component={EditCompany} />
					<PrivateRoute path="/employees" component={Employees} />
				</div>
			</Router>
		);
	}
}

export default Routes;
