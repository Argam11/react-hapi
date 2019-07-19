import React, { Component } from 'react';
import * as api from 'api';
import './style.css';

import CompaniesList from './general-components/list';

class Companies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	async componentDidMount() {
		try {
			const { data } = await api.getAllCompanies();
			this.setState({
				data
			});
		} catch (error) {
			console.log(error);
		}
	}

	createCompany() {
		this.props.history.push('/createCompany');
	}

	editCompany(id) {
		this.props.history.push(`/editCompany/${id}`);
	}

	async deleteCompany(id) {
		const { data } = this.state;
		try {
			const res = await api.deleteOneCompany(id);

			if (res.data === 'success') {
				let newData = data.filter((item) => item.id !== id);
				this.setState({ data: newData });
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { data } = this.state;

		return (
			<div className="companies__box">
				<h1>Companies page!</h1>
				<div className="companies__createButton">
					<div onClick={() => this.createCompany()}>Create</div>
				</div>
				<div className="companies__header">
					<div className="companies__headerItem">ID</div>
					<div className="companies__headerItem">Name</div>
					<div className="companies__headerItem">Email</div>
					<div className="companies__headerItem">Logo</div>
					<div className="companies__headerItem">Website</div>
					<div className="companies__headerItem companies__itemEdit">Edit</div>
					<div className="companies__headerItem companies__itemDelete">Delete</div>
				</div>
				<div className="companies__content">
					{data &&
						data.map((company) => {
							return (
								<CompaniesList
									key={company.id}
									company={company}
									editCompany={(id) => this.editCompany(id)}
									deleteCompany={(id) => this.deleteCompany(id)}
								/>
							);
						})}
				</div>
			</div>
		);
	}
}

export default Companies;
