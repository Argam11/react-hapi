import React, { Component } from 'react';
import './style.css';
import * as api from 'api';
import axios from 'axios';

import CompaniesForm from './general-components/form';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: {
				name: '',
				email: '',
				logo: '',
				website: ''
			},
			file: {},
			error: ''
		};
		this.config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('authToken')
			}
		};
		this.companyId = this.props && this.props.match && this.props.match.params && this.props.match.params.companyId;
	}

	async componentDidMount() {
		const { data } = (await api.getOneCompany(this.companyId)) || {};
		const { name, email, logo, website } = data || {};
		this.setState({
			company: {
				name,
				email,
				logo,
				website
			}
		});
	}

	handleFile(e) {
		let file = e.target.files[0];
		var formData = new FormData();
		formData.append('file', file);
		this.setState({
			company: {
				...this.state.company,
				logo: file.name
			},
			file: formData
		});
	}

	handleChange(e) {
		let { name, value } = e.target;
		this.setState({
			company: {
				...this.state.company,
				[name]: value
			}
		});
	}

	async handleClick() {
		let { company, file } = this.state;
		let { name, email, website } = company;

		if (name && email && website) {
			try {
				const { data } = (await api.uploadCompanyLogo(file)) || {};
				const { logo } = data || {};
				this.setState(
					{
						company: {
							...this.state.company,
							logo
						}
					},
					async () => {
						try {
							const { company } = this.state;
							await api.editCompany(this.companyId, company);
							this.props.history.push('/companies');
						} catch (error) {
							if (error.response && error.response.data && error.response.data.message) {
								this.setState({
									error: error.response.data.message
								});
							}
						}
					}
				);
			} catch (error) {
				this.setState({
					error: error.message
				});
			}
		} else {
			this.setState({
				error: !name
					? 'Fill the name field'
					: !email ? 'Fill the email field' : !file ? 'Fill the logo field' : 'Fill the website field'
			});
		}
	}

	back() {
		this.props.history.push('/companies');
	}

	render() {
		let { company, error } = this.state;

		return (
			<div className="companies__box">
				<CompaniesForm
					company={company}
					error={error}
					back={() => this.back()}
					handleChange={(e) => this.handleChange(e)}
					handleFile={(e) => this.handleFile(e)}
					handleClick={() => this.handleClick()}
				/>
			</div>
		);
	}
}

export default Edit;
