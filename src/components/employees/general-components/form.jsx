import React from 'react';

export default function Form({ employee, companies, error, back, handleChange, handleClick }) {
	const { firstName, lastName, companyId, email, phone } = employee || {};

	return (
		<div className="employees__form">
			<h1>Employees page!</h1>
			<div className="employees__backButton">
				<div onClick={back}>Back</div>
			</div>
			<div className="createEmployees__content">
				<div className="createemployees__block">
					<div className="errorsBox">
						<p>{error}</p>
					</div>
					<div className="createEmployees__item">
						<p>First Name:</p>
						<input type="text" name="firstName" value={firstName} onChange={(e) => handleChange(e)} />
					</div>
					<div className="createEmployees__item">
						<p>Last Name:</p>
						<input type="text" name="lastName" value={lastName} onChange={(e) => handleChange(e)} />
					</div>
					<div className="createEmployees__item">
						<p>Company:</p>
						<select
							className="createEmployees__item"
							name="companyId"
							value={companyId}
							onChange={(e) => handleChange(e)}
						>
							<option value="hidden" hidden>
								Companies
							</option>
							{companies.map((company) => {
								return (
									<option key={company.id} value={company.id}>
										{company.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="createEmployees__item">
						<p>Email:</p>
						<input type="text" name="email" value={email} onChange={(e) => handleChange(e)} />
					</div>
				</div>
				<div className="createEmployees__item">
					<p>Phone:</p>
					<input type="text" name="phone" value={phone} onChange={(e) => handleChange(e)} />
				</div>
				<div className="createEmployees__item createEmployees__send">
					<div onClick={handleClick}>Create employee</div>
				</div>
			</div>
		</div>
	);
}
