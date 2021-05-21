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
import { IAnswers, IOption } from '../utils/types';
import schulze from 'schulze-method';
import { Button, CandidateResultItem } from '../components';
import { strings } from '../utils/strings';
import { ScrollView } from 'react-native-gesture-handler';

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

  const [results, setResults] = useState<IResult[]>([]);

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
    setResults(
      schulze.run(poll.options.length, convertUserAnswers(poll.answers))
    );
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  //console.log('res: ', results);

  interface IResult {
    indexes: number[];
    place: number;
  }

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          {results.map((res) => (
            <CandidateResultItem
              key={res.place.toString()}
              indexes={res.indexes}
              place={res.place}
              options={poll.options}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {userIsAdmin && (
          <Button
            title={strings.mainScreenCreatePollButton.eng}
            onPress={() => navigation.navigate('CreatePollScreen')}
          />
        )}
      </View>
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
  headerText: {
    color: colors.black,
    fontSize: 34,
  },
  scrollViewContainer: {
    paddingVertical: 20,
    width: '90%',
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    paddingVertical: 10,
    width: '80%',
    flex: 2,
    paddingBottom: 30,
  },
});

export default ResultScreen;
