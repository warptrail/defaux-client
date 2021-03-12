/* eslint-disable react/prop-types */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const coffeeIcon = <FontAwesomeIcon icon="coffee" />;
const anchorIcon = <FontAwesomeIcon icon="anchor" />;
const locationArrowIcon = <FontAwesomeIcon icon="location-arrow" />;
const carIcon = <FontAwesomeIcon icon="car" />;
const bicycleIcon = <FontAwesomeIcon icon="bicycle" />;
const beerIcon = <FontAwesomeIcon icon="beer" />;
const bombIcon = <FontAwesomeIcon icon="bomb" />;
const banIcon = <FontAwesomeIcon icon="ban" />;
const bookIcon = <FontAwesomeIcon icon="book" />;
const bugIcon = <FontAwesomeIcon icon="bug" />;
const calendarIcon = <FontAwesomeIcon icon="calendar" />;
const cameraIcon = <FontAwesomeIcon icon="camera" />;
const codeBranchIcon = <FontAwesomeIcon icon="code-branch" />;
const downloadIcon = <FontAwesomeIcon icon="download" />;
const envelopeIcon = <FontAwesomeIcon icon="envelope" />;
const fighterJetIcon = <FontAwesomeIcon icon="fighter-jet" />;
const fireExtinguisherIcon = <FontAwesomeIcon icon="fire-extinguisher" />;
const flaskIcon = <FontAwesomeIcon icon="flask" />;
const headPhonesIcon = <FontAwesomeIcon icon="headphones" />;
const penIcon = <FontAwesomeIcon icon="pen" />;
const showerIcon = <FontAwesomeIcon icon="shower" />;
const shoppingBasketIcon = <FontAwesomeIcon icon="shopping-basket" />;
const hamburgerIcon = <FontAwesomeIcon icon="hamburger" />;
const diceD20Icon = <FontAwesomeIcon icon="dice-d20" />;
const circleIcon = <FontAwesomeIcon icon="circle" />;
const bellIcon = <FontAwesomeIcon icon="bell" />;
const umbrellaBeachIcon = <FontAwesomeIcon icon="umbrella-beach" />;
const leafIcon = <FontAwesomeIcon icon="leaf" />;
const laptopIcon = <FontAwesomeIcon icon="laptop" />;
const hourglassIcon = <FontAwesomeIcon icon="hourglass" />;
const moonIcon = <FontAwesomeIcon icon="moon" />;
const robotIcon = <FontAwesomeIcon icon="robot" />;
const pizzaSliceIcon = <FontAwesomeIcon icon="pizza-slice" />;
const cowboyHatIcon = <FontAwesomeIcon icon="hat-cowboy" />;
const hammerIcon = <FontAwesomeIcon icon="hammer" />;

function IconSelector(props) {
  const { handleChange } = props;

  return (
    <div>
      <select onChange={handleChange} name="icon">
        <option value="coffee">coffee</option>
        <option value="anchor">anchor</option>
        <option value="location-arrow">location-arrow</option>
        <option value="car">car</option>
        <option value="bicycle">bicycle</option>
        <option value="beer">beer</option>
        <option value="bomb">bomb</option>
        <option value="ban">ban</option>
        <option value="book">book</option>
        <option value="bug">bug</option>
        <option value="calendar">calendar</option>
        <option value="camera">camera</option>
        <option value="code-branch">code-branch</option>
        <option value="download">download</option>
        <option value="envelope">envelope</option>
        <option value="fighter-jet">fighter-jet</option>
        <option value="fire-extinguisher">fire-extinguisher</option>
        <option value="flask">flask</option>
        <option value="headphones">headphones</option>
        <option value="pen">pen</option>
        <option value="shower">shower</option>
        <option value="shopping-basket">shopping-basket</option>
        <option value="hamburger">hamburger</option>
        <option value="dice-d20">dice-d20</option>
        <option value="circle">circle</option>
        <option value="bell">bell</option>
        <option value="umbrella-beach">umbrella-beach</option>
        <option value="leaf">leaf</option>
        <option value="laptop">laptop</option>
        <option value="hourglass">hourglass</option>
        <option value="moon">moon</option>
        <option value="robot">robot</option>
        <option value="pizza-slice">pizza-slice</option>
        <option value="hat-cowboy">hat-cowboy</option>
        <option value="hammer">hammer</option>
      </select>
    </div>
  );
}

export default IconSelector;
