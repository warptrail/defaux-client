import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    console.log(this.context.user.username);
    return (
      <>
        <li>
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </li>
      </>
    );
  }

  renderLoginLink() {
    return (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
      </>
    );
  }

  render() {
    return (
      <header>
        <h1>
          <Link to="/" style={{ color: 'red' }}>
            Warp Trail Default Application Interface
          </Link>
        </h1>
        <h2>Welcome {this.context.user.username}</h2>
        <nav>
          <ul>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}

            <li>
              <Link to="/widget">Widgets</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/Music">Music</Link>
            </li>
            <li>
              <Link to="/time">Time</Link>
            </li>
            <li>
              <Link to="/effect">Effect</Link>
            </li>
            <li>
              <Link to="/mosh">Mosh</Link>
            </li>
          </ul>
        </nav>
        <nav className="secondary_nav">
          <ul>
            <li>Unit Converter</li>
            <li>Bookmarks</li>
            <li>User Profile</li>
            <li>Other Users</li>
            <li>Todo List</li>
            <li>Blog</li>
            <li>Things</li>
            <li>Shop</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
