import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Companies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('authToken')
			}
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:8000/companies', this.config)
			.then((res) => {
				this.setState({
					data: res.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_createCompany() {
		this.props.history.push('/createCompany');
	}

	_editCompany(id) {
		this.props.history.push(`/editCompany/${id}`);
	}

	_deleteCompany(id) {
		let { data } = this.state;

		axios
			.delete(`http://localhost:8000/companies/${id}`, this.config)
			.then((res) => {
				let newData = data.filter((item) => item.id !== id);
				this.setState({ data: newData });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		let { data } = this.state;

		return (
			<div className="companies__box">
				<h1>Companies page!</h1>
				<div className="companies__createButton">
					<div onClick={() => this._createCompany()}>Create</div>
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
						data.map((company, index) => {
							return (
								<div className="companies__contentRow" key={index}>
									<div className="companies__item">{company.id}</div>
									<div className="companies__item">{company.name}</div>
									<div className="companies__item">{company.email}</div>
									<div className="companies__item companies__logoBox">
										<img src={`/images/${company.logo}`} alt="company logo" />
									</div>
									<div className="companies__item">{company.website}</div>
									<div className="companies__item companies__itemEdit">
										<div onClick={() => this._editCompany(company.id)}>Edit</div>
									</div>
									<div className="companies__item companies__itemDelete">
										<div onClick={() => this._deleteCompany(company.id)}>Delete</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

export default Companies;
