import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			logo: '',
			website: '',
			error: ''
		};
	}

	_createCompany() {
		this.props.history.push('/companies');
	}

	handleChange(e) {
		let { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	_handleClick() {
		let { name, email, logo, website } = this.state;
		if (name && email && logo && website) {
			let company = { name, email, logo, website };
			let config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('authToken')
				}
			};

			axios
				.post('http://localhost:8000/createCompany', company, config)
				.then(() => {
					this.props.history.push('/companies');
				})
				.catch((e) => {
					if (e.response && e.response.data && e.response.data.message) {
						this.setState({
							error: e.response.data.message
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
	}

	render() {
		let { name, email, logo, website, error } = this.state;

		return (
			<div className="companies__box">
				<h1>Companies page!</h1>
				<div className="companies__createButton">
					<div onClick={() => this._createCompany()}>Back</div>
				</div>
				<div className="createCompanies__content">
					<div className="createCompanies__block">
						<div className="errorsBox">
							<p>{error}</p>
						</div>
						<div className="createCompanies__item">
							<p>Name:</p>
							<input type="text" name="name" value={name} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="createCompanies__item">
							<p>Email:</p>
							<input type="text" name="email" value={email} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="createCompanies__item">
							<p>Logo:</p>
							<input type="text" name="logo" value={logo} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="createCompanies__item">
							<p>Website:</p>
							<input type="text" name="website" value={website} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="createCompanies__item createCompanies__send">
							<div onClick={() => this._handleClick()}>Create company</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Create;
