import TYPES from './types';

export const setData = (data) => {
  return {
    type: TYPES.SET_DATA,
    payload: data
  };
};