import React, { Component } from 'react';
import * as api from 'api';
import './style.css';

import EmployeesList from './general-components/list';

class Employees extends Component {
	state = {
		data: []
	};

	async componentDidMount() {
		try {
			const { data } = await api.getAllEmployees();
			this.setState({
				data
			});
		} catch (error) {
			console.log(error);
		}
	}

	createEmployee() {
		console.log(11);

		// this.props.history.push('/createEmployee');
	}

	editEmployee(id) {
		console.log(id);
		// this.props.history.push(`/editEmployee/${id}`);
	}

	async deleteEmployee(id) {
		console.log(id);

		// const { data } = this.state;

		// try {
		// 	const res = await api.deleteOneCompany(id);

		// 	if (res.data === 'success') {
		// 		let newData = data.filter((item) => item.id !== id);
		// 		this.setState({ data: newData });
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	}

	render() {
		const { data } = this.state;
		console.log(data);

		return (
			<div className="employees__box">
				<h1>Employees page!</h1>
				<div className="employees__createButton">
					<div onClick={() => this.createCompany()}>Create</div>
				</div>
				<div className="employees__header">
					<div className="employees__headerItem">ID</div>
					<div className="employees__headerItem">First name</div>
					<div className="employees__headerItem">Last name</div>
					<div className="employees__headerItem">Company</div>
					<div className="employees__headerItem">Email</div>
					<div className="employees__headerItem">Phone</div>
					<div className="employees__headerItem employees__itemEdit">Edit</div>
					<div className="employees__headerItem employees__itemDelete">Delete</div>
				</div>
				<div className="employees__content">
					{data &&
						data.map((employee) => {
							return (
								<EmployeesList
									key={employee.id}
									employee={employee}
									editEmployee={(id) => this.editEmployee(id)}
									deleteEmployee={(id) => this.deleteEmployee(id)}
								/>
							);
						})}
				</div>
			</div>
		);
	}
}

export default Employees;
