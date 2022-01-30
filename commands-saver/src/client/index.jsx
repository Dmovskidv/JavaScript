import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/configureStore';
import Application from './components/AppRouting';


const app = (
  <Provider store={store}>
    <Application />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
