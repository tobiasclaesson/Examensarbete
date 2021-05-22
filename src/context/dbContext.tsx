import React, { createContext, FC, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (auth.currentUser) {
      const pollSubscriber = db.collection('polls').onSnapshot(
        (querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.id === 'activePoll') {
              dispatch(
                ActionTypes.updatePoll(documentSnapshot.data() as IPoll)
              );
            }
          });
        },
        (error) => {
          if (auth.currentUser) {
            console.log('error: onSnapshot', error);
          }
        }
      );

      return () => pollSubscriber();
    }
  });

  const getPoll = async () => {
    try {
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
    } catch (error) {
      console.log('error: getPoll ', error);
    }
  };

  const addPoll = async (poll: IPoll, closure?: () => void | void) => {
    console.log('in add poll: ', auth.currentUser);

    setPollIsLoading(true);
    if (auth.currentUser) {
      try {
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
      } catch (error) {
        console.log('error: addPoll ', error);
      }
    }
  };

  const addUserHaveVoted = async () => {
    try {
      await db
        .collection('polls')
        .doc('activePoll')
        .update({
          usersHaveVoted: firebase.firestore.FieldValue.arrayUnion(
            auth.currentUser?.uid
          ),
        });
    } catch (error) {
      console.log('error: addUsersVoted', error);
    }
  };

  const addAnswer = async (
    name: string,
    answer: IOption[],
    comment: string,
    closure?: () => void
  ) => {
    try {
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
    } catch (error) {
      console.log('error: addAnswers ', error);
    }
  };

  return (
    <DBContext.Provider value={{ addPoll, getPoll, addAnswer, pollIsLoading }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
