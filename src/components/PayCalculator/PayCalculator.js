import React, { useState } from 'react';

import './PayCalculator.css';

function notes() {
  return (
    <div className="notes">
      <a href="https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react">
        Handling multiple inputs with a single onchange handler
      </a>
    </div>
  );
}

function PayCalculator() {
  // Thinkful Hours Code

  const [state, setState] = useState({
    actualHours: 40,
    hourlyRate: 8,
    overtime: 1.5,
    weeklyHours: 40
  });

  const overtimeHours =
    state.actualHours > state.weeklyHours
      ? state.actualHours - state.weeklyHours
      : 0;
  const normalHours =
    state.actualHours > state.weeklyHours
      ? state.weeklyHours
      : state.actualHours;
  const normalPay = normalHours * state.hourlyRate;
  const overtimePay = overtimeHours * state.hourlyRate * state.overtime;

  const totalPay = normalPay + overtimePay;

  console.log(`The total pay is $${totalPay}`);

  // handleChange for multiple inputs
  const handleChange = (e) => {
    console.log(e.target.name);
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  return (
    <div>
      <h2>Payment Calculator</h2>
      {notes()}
      <form className="pay_form">
        <label>Actual Hours</label>
        <input
          id="actual_hours"
          name="actualHours"
          type="number"
          value={state.actualHours}
          onChange={handleChange}
        />
        <label>Hourly Rate</label>
        <input
          id="hourly_rate"
          name="hourlyRate"
          type="number"
          value={state.hourlyRate}
          onChange={handleChange}
        />
        <label>Overtime</label>
        <input
          id="overtime"
          name="overtime"
          type="number"
          value={state.overtime}
          onChange={handleChange}
        />
        <label>Weekly Hours</label>
        <input
          id="weekly_hours"
          name="weeklyHours"
          type="number"
          value={state.weeklyHours}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default PayCalculator;
