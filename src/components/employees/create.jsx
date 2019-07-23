import React, { Component } from 'react';
import * as api from 'api';
import './style.css';

import EmployeesForm from './general-components/form';

class Create extends Component {
	state = {
		employee: {
			firstName: '',
			lastName: '',
			companyId: '',
			email: '',
			phone: ''
		},
		companies: [],
		error: ''
	};

	async componentDidMount() {
		const companies = (await api.getAllCompanies()) || {};
		this.setState({ companies: companies.data });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			employee: {
				...this.state.employee,
				[name]: value
			}
		});
	}

	async handleClick() {
		const { employee } = this.state;
		const { firstName, lastName, companyId, email, phone } = employee || {};
		if (firstName && lastName && companyId && email && phone) {
			try {
				await api.createEmployee(employee);
				this.props.history.push('/employees');
			} catch (error) {
				this.setState({
					error: error.message
				});
			}
		} else {
			this.setState({
				error: !firstName
					? 'Fill the first name field'
					: !lastName
						? 'Fill the last name field'
						: !companyId ? 'Fill the cpmpany field' : !email ? 'Fill the email field' : 'Fill the phone field'
			});
		}
	}

	back() {
		this.props.history.push('/employees');
	}

	render() {
		const { companies, error } = this.state;

		return (
			<div className="employees__box">
				<EmployeesForm
					companies={companies}
					error={error}
					back={() => this.back()}
					handleChange={(e) => this.handleChange(e)}
					handleClick={() => this.handleClick()}
				/>
			</div>
		);
	}
}

export default Create;
