import { pollReducer } from './pollReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  pollReducer,
});

export default allReducers;

export type ReducerState = ReturnType<typeof allReducers>;
