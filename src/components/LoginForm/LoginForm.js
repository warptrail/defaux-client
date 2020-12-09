import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  static contextType = UserContext;

  state = { error: null, loading: false };

  firstInput = React.createRef();

  componentDidMount() {
    this.firstInput.current.focus();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null, loading: true });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
        // this.setState({ loading: false });
      })
      .catch((res) => {
        console.log(res.error);
        this.setState({ error: res.error, loading: false });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div className="error_message" role="alert">
          {error && <p>{this.state.error}</p>}
        </div>
        <div>
          <label htmlFor="login-username-input">Username</label>
          <input
            ref={this.firstInput}
            id="login-username-input"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="login-password-input">Password</label>
          <input
            id="login-password-input"
            name="password"
            type="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        {this.state.loading ? <p>Loading</p> : <p>Not Loading</p>}
      </form>
    );
  }
}

export default LoginForm;
