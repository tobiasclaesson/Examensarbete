import * as ActionTypes from './actions';
import { PollActionTypes } from './actions';
import { IPoll } from '../utils/types';

export interface IPollState {
  poll: IPoll;
}

const initialState: IPollState = {
  poll: {
    title: 'init',
    options: [],
    usersHaveVoted: [],
    answers: [],
  },
};

export function pollReducer(
  state = initialState,
  action: PollActionTypes
): IPollState {
  switch (action.type) {
    case ActionTypes.UPDATE_POLL: {
      return action.payload;
    }
    default:
      return state;
  }
}
