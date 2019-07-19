import React, { Component } from 'react';
import './style.css';
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
				file: {},
				website: ''
			},
			error: ''
		};
		this.config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('authToken')
			}
		};
		this.companyId = this.props && this.props.match && this.props.match.params && this.props.match.params.companyId;
	}

	componentDidMount() {
		axios.get(`http://localhost:8000/companies/${this.companyId}`, this.config).then((res) => {
			let { name, email, logo, website } = res.data;
			this.setState({
				company: {
					name,
					email,
					logo,
					website
				}
			});
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

	handleClick() {
		let { company, file } = this.state;
		let { name, email, website } = company;

		axios
			.post(`http://localhost:8000/upload`, file, this.config)
			.then((res) => {
				let logo = res.data;
				if (name && email && logo && website) {
					axios
						.put(`http://localhost:8000/companies/${this.companyId}`, company, this.config)
						.then(() => {
							this.props.history.push('/companies');
						})
						.catch((err) => {
							if (err.response && err.response.data && err.response.data.message) {
								this.setState({
									error: err.response.data.message
								});
							}
						});
				} else {
					this.setState({
						error: !name
							? 'Fill the name field'
							: !email ? 'Fill the email field' : !logo ? 'Fill the logo field' : 'Fill the website field'
					});
				}
			})
			.catch((err) => {
				this.setState({
					error: 'Fill the logo field'
				});
			});
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
