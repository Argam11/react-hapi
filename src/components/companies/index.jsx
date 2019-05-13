import React, { Component } from 'react';
import './style.css';

class Companies extends Component {
	_createCompany() {
		this.props.history.push('/createCompany');
	}

	render() {
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
					<div className="companies__contentRow">
						<div className="companies__item">ID</div>
						<div className="companies__item">Name</div>
						<div className="companies__item">Email</div>
						<div className="companies__item">Logo</div>
						<div className="companies__item">Website</div>
						<div className="companies__item companies__itemEdit">
							<div>Edit</div>
						</div>
						<div className="companies__item companies__itemDelete">
							<div>Delete</div>
						</div>
					</div>
					<div className="companies__contentRow">
						<div className="companies__item">ID</div>
						<div className="companies__item">Name</div>
						<div className="companies__item">Email</div>
						<div className="companies__item">Logo</div>
						<div className="companies__item">Website</div>
						<div className="companies__item companies__itemEdit">
							<div>Edit</div>
						</div>
						<div className="companies__item companies__itemDelete">
							<div>Delete</div>
						</div>
					</div>
					<div className="companies__contentRow">
						<div className="companies__item">ID</div>
						<div className="companies__item">Name</div>
						<div className="companies__item">Email</div>
						<div className="companies__item">Logo</div>
						<div className="companies__item">Website</div>
						<div className="companies__item companies__itemEdit">
							<div>Edit</div>
						</div>
						<div className="companies__item companies__itemDelete">
							<div>Delete</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Companies;
