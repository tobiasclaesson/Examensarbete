import React, { createContext, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase/firebase';
import { IAnswers, IOption, IPoll } from '../utils/types';
import * as ActionTypes from '../store/actions';
import firebase from 'firebase';

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getPoll: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addPoll: (poll: IPoll, closure?: (() => void) | undefined) => {},

  addAnswer: (
    name: string,
    answer: IOption[],
    comment: string,
    closure?: (() => void) | undefined
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => {},
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
        id: doc.id,
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

  const addUserHaveVoted = async () => {
    await db
      .collection('polls')
      .doc('activePoll')
      .update({
        usersHaveVoted: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser?.uid
        ),
      });
  };

  const addAnswer = async (
    name: string,
    answer: IOption[],
    comment: string,
    closure?: () => void
  ) => {
    const snapshot = await db.collection('polls').doc('activePoll').get();
    let answerList: IAnswers[] = [];

    const newAnswer: IAnswers = {
      name: name,
      rankingList: [],
      comment: comment,
    };

    if (snapshot) {
      const firebaseArray: IAnswers[] = snapshot.data()?.answers;

      answer.forEach((ans) => {
        newAnswer.rankingList.push(ans.title);
      });

      firebaseArray.push(newAnswer);
      answerList = firebaseArray;
    }
    /* 
    answer.forEach((ans) => {
      answerStringList.rankingList.push(ans.title);
    }); */

    await db
      .collection('polls')
      .doc('activePoll')
      .update({
        answers: answerList,
      })
      .then(() => {
        addUserHaveVoted();
        if (closure) {
          closure();
        }
      });
  };

  return (
    <DBContext.Provider value={{ addPoll, getPoll, addAnswer, pollIsLoading }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
