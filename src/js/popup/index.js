import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import App from './App';

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
render();
