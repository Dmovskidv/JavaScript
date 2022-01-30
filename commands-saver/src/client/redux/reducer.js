import { List, Map } from 'immutable';
import TYPES from './types';


const INITIAL_STATE = Map({
  commands: List()
});

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_DATA:

      return state.set('commands', action.payload);
    default:
      return state;
  }
};

export default rootReducer;