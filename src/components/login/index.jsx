import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../api';
import './style.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			error: ''
		};
	}
	async _login() {
		let { login, password } = this.state;
		if (login && password) {
			let user = { login, password };
			try {
				const { data } = (await api.login(user)) || {};
				if (data) {
					localStorage.setItem('authToken', data.token);
					const { location } = this.props;
					if (location && location.state) {
						let { pathname } = location.state.from || {};
						this.props.history.push(pathname);
					} else {
						this.props.history.push('/');
					}
				}
			} catch (error) {
				if (error.response && error.response.data && error.response.data.message) {
					this.setState({
						error: error.response.data.message
					});
				}
			}
		} else {
			!login
				? this.setState({
						error: 'Fill the login field'
					})
				: this.setState({
						error: 'Fill the password field'
					});
		}
	}

	_onChange(e) {
		let { login, password } = { ...this.state };
		let currentState = { login, password };
		let { name, value } = e.target;
		currentState[name] = value;
		this.setState({
			...currentState
		});
	}

	render() {
		let { login, password, error } = this.state;

		return (
			<div className="login__box">
				<div>
					<fieldset className="login__block">
						<legend>Login</legend>
						<div className="errorsBox">
							<p>{error}</p>
						</div>
						<div>
							<p>Login</p>
							<input
								type="text"
								name="login"
								placeholder="login"
								value={login}
								onChange={(e) => this._onChange(e)}
							/>
						</div>
						<div>
							<p>Password</p>
							<input
								type="password"
								name="password"
								placeholder="password"
								value={password}
								onChange={(e) => this._onChange(e)}
							/>
						</div>
						<input type="button" value="Login" onClick={(e) => this._login()} />
					</fieldset>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
