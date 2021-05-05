import React, { createContext, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase/firebase';
import { IPoll } from '../utils/types';
import * as ActionTypes from '../store/actions';

type PropTypes = {
  children?: React.ReactNode;
};

const pollInitialState: IPoll = {
  title: '',
  options: [],
  usersHaveVoted: [],
  answers: [],
};

const initialState = {
  pollIsLoading: false,
  getPoll: () => {},
  addPoll: (poll: IPoll, closure?: (() => void) | undefined) => {},
};

export const DBContext = createContext(initialState);

const DBContextProvider: FC = (props: PropTypes) => {
  const { children } = props;

  const dispatch = useDispatch();

  const [pollIsLoading, setPollIsLoading] = useState(true);

  const getPoll = async () => {
    const doc = await db.collection('polls').doc('activePoll').get();

    if (doc) {
      const activePoll = {
        title: doc.data()?.title,
        options: doc.data()?.options,
        usersHaveVoted: doc.data()?.usersHaveVoted,
        answers: doc.data()?.answers,
      };

      dispatch(ActionTypes.updatePoll(activePoll));
      setPollIsLoading(false);
    }
  };

  const addPoll = async (poll: IPoll, closure?: () => void | void) => {
    setPollIsLoading(true);
    if (auth.currentUser) {
      const snapshot = await db.collection('polls').doc('activePoll').get();

      await db.collection('polls').doc('activePoll').set(poll);

      if (snapshot) {
        const finishedPoll = snapshot.data() || pollInitialState;
        await db.collection('finishedPolls').add(finishedPoll);
      }

      getPoll();

      if (closure) {
        closure();
      }
    }
  };

  return (
    <DBContext.Provider value={{ addPoll, getPoll, pollIsLoading }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
