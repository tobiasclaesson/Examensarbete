import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ListViewComponent } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { DBContext } from '../context/dbContext';
import { ReducerState } from '../store';
import { useSelector } from 'react-redux';
import SplashScreen from './splashScreen';
import { IAnswers } from '../utils/types';
import schulze from 'schulze-method';
import { Button } from '../components';
import { strings } from '../utils/strings';

type ResultScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ResultScreen'
>;

interface IProps {
  navigation: ResultScreenNavigationProp;
}

const ResultScreen: FC<IProps> = (props: IProps) => {
  const { navigation } = props;

  const { userIsAdmin, isLoading } = useContext(AuthContext);
  const { getPoll, pollIsLoading } = useContext(DBContext);

  const { poll } = useSelector((state: ReducerState) => state.pollReducer);

  const [result, setResult] = useState<any>({});

  type ConvertAnswerArrayType = Array<number[]>;
  const convertUserAnswers = (answers: IAnswers[]): ConvertAnswerArrayType => {
    const convertedAnswerArray: ConvertAnswerArrayType = [];
    let convertedAnswer: number[] = [];

    answers.forEach((ans) => {
      poll.options.forEach((opt, j) => {
        ans.rankingList.forEach((rl, k) => {
          if (rl === opt.title) {
            convertedAnswer.push(k);
          }
          if (k + 1 === poll.options.length && j + 1 === poll.options.length) {
            convertedAnswerArray.push(convertedAnswer);
            convertedAnswer = [];
          }
        });
      });
    });

    return convertedAnswerArray;
  };

  useEffect(() => {
    setResult(
      schulze.run(poll.options.length, convertUserAnswers(poll.answers))
    );
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  console.log('res: ', result);

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      {userIsAdmin && (
        <Button
          title={strings.mainScreenCreatePollButton.eng}
          onPress={() => navigation.navigate('CreatePollScreen')}
        />
      )}
      <Text>Result</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGrey,
  },
});

export default ResultScreen;
