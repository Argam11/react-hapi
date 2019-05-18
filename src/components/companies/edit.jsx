import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			logo: '',
			file: {},
			website: '',
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
		axios
			.get(`http://localhost:8000/companies/${this.companyId}`, this.config)
			.then((res) => {
				let { name, email, logo, website } = res.data;
				this.setState({
					name,
					email,
					logo,
					website
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_handleFile(e) {
		let file = e.target.files[0];
		var formData = new FormData();
		formData.append('file', file);
		this.setState({
			logo: file.name,
			file: formData
		});
	}

	handleChange(e) {
		let { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	_handleClick() {
		let { file } = this.state;

		axios
			.post(`http://localhost:8000/upload`, file, this.config)
			.then((res) => {
				let { name, email, website } = this.state;
				let logo = res.data;
				if (name && email && logo && website) {
					let company = { name, email, logo, website };
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

	_back() {
		this.props.history.push('/companies');
	}

	render() {
		let { name, email, logo, website, error } = this.state;
		return (
			<div className="companies__box">
				<h1>Companies page!</h1>
				<div className="companies__createButton">
					<div onClick={() => this._back()}>Back</div>
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
							<label>
								<input
									type="file"
									hidden
									accept="image/png, image/jpeg"
									name="logo"
									onChange={(e) => this._handleFile(e)}
								/>
								<div className="createCompanies__imgBox">
									<img src="/images/upload.png" className="upload_img" alt="upload" />
								</div>
							</label>
							<div>
								<p className="image_path">{logo && logo}</p>
							</div>
						</div>
						<div className="createCompanies__item">
							<p>Website:</p>
							<input type="text" name="website" value={website} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="createCompanies__item createCompanies__send">
							<div onClick={() => this._handleClick()}>Edit company</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Edit;
