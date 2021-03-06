import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './style.css';

import Header from 'components/header';

import Home from 'components/home';
import Login from 'components/login';
import Companies from 'components/companies';
import CreateCompany from 'components/companies/create';
import EditCompany from 'components/companies/edit';
import Employees from 'components/employees';
import CreateEmployee from 'components/employees/create';
import EditEmployee from 'components/employees/edit';

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
					<PrivateRoute path="/editCompany/:id" component={EditCompany} />
					<PrivateRoute path="/employees" component={Employees} />
					<PrivateRoute path="/createEmployee" component={CreateEmployee} />
					<PrivateRoute path="/editEmployee/:id" component={EditEmployee} />
				</div>
			</Router>
		);
	}
}

export default Routes;
