import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  firstInput = React.createRef();

  componentDidMount() {
    this.firstInput.current.focus();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then((user) => {
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error.message}</p>}</div>

        <div>
          <label htmlFor="registration-username-input">Choose a username</label>
          <input
            ref={this.firstInput}
            id="registration-username-input"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="registration-password-input">Choose a password</label>
          <input
            id="registration-password-input"
            name="password"
            type="password"
            required
          />
        </div>
        <footer>
          <button type="submit">Sign up</button>{' '}
          <Link to="/login">Already have an account?</Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
