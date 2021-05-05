import { IPoll } from '../utils/types';

export const UPDATE_POLL = 'UPDATE_POLL';

interface UpdatePollAction {
  type: typeof UPDATE_POLL;
  payload: { poll: IPoll };
}

export type PollActionTypes = UpdatePollAction;

export const updatePoll = (poll: IPoll): PollActionTypes => {
  return {
    type: UPDATE_POLL,
    payload: {
      poll,
    },
  };
};
