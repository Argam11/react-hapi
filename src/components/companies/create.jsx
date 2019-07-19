import React, { Component } from 'react';
import * as api from 'api';
import './style.css';

import CompaniesForm from './general-components/form';

class Create extends Component {
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
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			company: {
				...this.state.company,
				[name]: value
			}
		});
	}

	handleFile(e) {
		const file = e.target.files[0];
		var formData = new FormData();
		formData.append('file', file);
		this.setState({
			file: formData,
			company: {
				...this.state.company,
				logo: file.name
			}
		});
	}

	async handleClick() {
		const { company, file } = this.state;
		const { name, email, website } = company;
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
						const { company } = this.state;
						try {
							await api.createCompany(company);
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
		const { company, error } = this.state;

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

export default Create;
