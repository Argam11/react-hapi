import React from 'react';

export default function Form({ company, error, back, handleChange, handleFile, handleClick }) {
	const { name, email, logo, website } = company || {};

	return (
		<div className="companies__form">
			<h1>Companies page!</h1>
			<div className="companies__backButton">
				<div onClick={back}>Back</div>
			</div>
			<div className="createCompanies__content">
				<div className="createCompanies__block">
					<div className="errorsBox">
						<p>{error}</p>
					</div>
					<div className="createCompanies__item">
						<p>Name:</p>
						<input type="text" name="name" value={name} onChange={(e) => handleChange(e)} />
					</div>
					<div className="createCompanies__item">
						<p>Email:</p>
						<input type="text" name="email" value={email} onChange={(e) => handleChange(e)} />
					</div>
					<div className="createCompanies__item">
						<p>Logo:</p>
						<label>
							<input
								type="file"
								hidden
								accept="image/png, image/jpeg"
								name="logo"
								onChange={(e) => handleFile(e)}
							/>
							<div className="createCompanies__imgBox">
								<img src="/images/upload.png" className="upload_img" alt="upload" />
							</div>
						</label>
						<div>
							<p className="image_path">{logo}</p>
						</div>
					</div>
					<div className="createCompanies__item">
						<p>Website:</p>
						<input type="text" name="website" value={website} onChange={(e) => handleChange(e)} />
					</div>
					<div className="createCompanies__item createCompanies__send">
						<div onClick={handleClick}>Create company</div>
					</div>
				</div>
			</div>
		</div>
	);
}
