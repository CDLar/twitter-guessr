import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './Test';

import GlobalStyles from './themes/GlobalStyles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Test />
  </React.StrictMode>,
  document.getElementById('root')
);

