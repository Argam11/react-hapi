import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: ''
		};
	}
	_login() {
		let { login, password } = this.state;
		if (login !== '' && password !== '') {
			let token =
				'Bearer ' +
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTY5NzIzMDMsImV4cCI6MTU1NzU3NzEwM30.8JBGuTQOrl_EPLW-tgjDmLwIl3fE7B8RT3JFitvPA_s';
			let config = { headers: { Authorization: token } };
			let user = { ...this.state };
			axios
				.post('http://localhost:8000/login', user, config)
				.then((a) => console.log(a))
				.catch((e) => console.log(e));
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
		let { login, password } = this.state;
		return (
			<div className="login__box">
				<div>
					<fieldset className="login__block">
						<legend>Login</legend>
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

export default Login;
