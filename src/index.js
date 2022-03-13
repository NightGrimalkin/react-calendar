import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Calendar from './calendar.js';

ReactDOM.render(
  <Calendar month={11} year={2021}/>,
  document.getElementById('root')
);

reportWebVitals();
