import React from 'react';
import './style.css';

export default function List({ company, editCompany, deleteCompany }) {
	return (
		<div className="companies__contentRow">
			<div className="companies__item">{company.id}</div>
			<div className="companies__item">{company.name}</div>
			<div className="companies__item">{company.email}</div>
			<div className="companies__item companies__logoBox">
				<img src={`/storage/${company.logo}`} alt="company logo" />
			</div>
			<div className="companies__item">{company.website}</div>
			<div className="companies__item companies__itemEdit">
				<div onClick={() => editCompany(company.id)}>Edit</div>
			</div>
			<div className="companies__item companies__itemDelete">
				<div onClick={() => deleteCompany(company.id)}>Delete</div>
			</div>
		</div>
	);
}
