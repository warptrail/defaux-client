import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

import { BarLoader, BounceLoader } from 'react-spinners';
import { css } from '@emotion/core';

import './LoginForm.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

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

  renderForm = () => {
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
      </form>
    );
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <BounceLoader
            css={override}
            color={'green'}
            loading={this.state.loading}
          />
        ) : (
          this.renderForm()
        )}
      </>
    );
  }
}

export default LoginForm;
