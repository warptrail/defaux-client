import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import PrivateRoute from '../utils/PrivateRoute';
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import RegistrationRoute from '../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../routes/DashboardRoute/DashboardRoute';
import WidgetRoute from '../routes/WidgetRoute/WidgetRoute';
import SingleWidgetRoute from '../routes/SingleWidgetRoute/SingleWidgetRoute';
import CalendarRoute from '../routes/CalendarRoute/CalendarRoute';
import NotFoundRoute from '../routes/NotFoundRoute/NotFoundRoute';
import './App.css';

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <Route exact path="/" component={DashboardRoute} />
            <PublicOnlyRoute path="/register" component={RegistrationRoute} />
            <PublicOnlyRoute path="/login" component={LoginRoute} />
            <PrivateRoute exact path="/widget" component={WidgetRoute} />
            <PrivateRoute
              exact
              path="/widget/:widgetId"
              component={SingleWidgetRoute}
            />
            <PrivateRoute exact path="/calendar" component={CalendarRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
