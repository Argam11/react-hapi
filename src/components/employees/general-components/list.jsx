import React from 'react';
import './style.css';

export default function List({ employee, editEmployee, deleteEmployee }) {
	return (
		<div className="employees__contentRow">
			<div className="employees__item">{employee.id}</div>
			<div className="employees__item">{employee.firstName}</div>
			<div className="employees__item">{employee.lastName}</div>
			<div className="employees__item">{employee.companyId}</div>
			<div className="employees__item">{employee.email}</div>
			<div className="employees__item">{employee.phone}</div>
			<div className="employees__item employees__itemEdit">
				<div onClick={() => editEmployee(employee.id)}>Edit</div>
			</div>
			<div className="employees__item employees__itemDelete">
				<div onClick={() => deleteEmployee(employee.id)}>Delete</div>
			</div>
		</div>
	);
}
