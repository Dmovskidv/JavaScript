import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { loggerMiddleware } from './middlewares';
import rootReducer from './reducer';


export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
  );

