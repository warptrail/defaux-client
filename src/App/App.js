import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAnchor, // anchor
  faLocationArrow, // location-arrow
  faCoffee, // coffee
  faCar, // car
  faBicycle, // bicycle
  faBeer,
  faBomb,
  faBan,
  faBook,
  faBug,
  faCalendar,
  faCamera,
  faCodeBranch,
  faDownload,
  faEnvelope,
  faFighterJet,
  faFireExtinguisher,
  faFlask,
  faHeadphones,
  faPen,
  faShower,
  faShoppingBasket,
  faHamburger,
  faDiceD20,
  faCircle,
  faBell,
  faUmbrellaBeach,
  faLeaf,
  faLaptop,
  faHourglass,
  faMoon,
  faRobot,
  faPizzaSlice,
  faHatCowboy,
  faHammer
} from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header/Header';
import PrivateRoute from '../utils/PrivateRoute';
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import RegistrationRoute from '../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../routes/DashboardRoute/DashboardRoute';
import WidgetRoute from '../routes/WidgetRoute/WidgetRoute';
import SingleWidgetRoute from '../routes/SingleWidgetRoute/SingleWidgetRoute';
import TimeRoute from '../routes/TimeRoute/TimeRoute';
import CalendarRoute from '../routes/CalendarRoute/CalendarRoute';
import MusicRoute from '../routes/MusicRoute/MusicRoute';
import EffectRoute from '../routes/EffectRoute/EffectRoute';
import MoshRoute from '../routes/MoshRoute/MoshRoute';
import PayCalculatorRoute from '../routes/PayCalculatorRoute/PayCalculatorRoute.js';
import Dogs from '../routes/DogsRoute/DogsRoute';
import NotFoundRoute from '../routes/NotFoundRoute/NotFoundRoute';
import './App.css';

library.add(
  fab,
  faAnchor,
  faLocationArrow,
  faCoffee,
  faCar,
  faBicycle,
  faBeer,
  faBomb,
  faBan,
  faBook,
  faBug,
  faCalendar,
  faCamera,
  faCodeBranch,
  faDownload,
  faEnvelope,
  faFighterJet,
  faFireExtinguisher,
  faFlask,
  faHeadphones,
  faPen,
  faShower,
  faShoppingBasket,
  faHamburger,
  faDiceD20,
  faCircle,
  faBell,
  faUmbrellaBeach,
  faLeaf,
  faLaptop,
  faHourglass,
  faMoon,
  faRobot,
  faPizzaSlice,
  faHatCowboy,
  faHammer
);

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
            <Route exact path="/music" component={MusicRoute} />
            <Route exact path="/time" component={TimeRoute} />
            <Route exact path="/effect" component={EffectRoute} />
            <Route exact path="/mosh" component={MoshRoute} />
            <Route exact path="/paycalculator" component={PayCalculatorRoute} />
            <Route exact path="/dogs" component={Dogs} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
