import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

import { Button, TextInputField } from '../components';
import { DBContext } from '../context/dbContext';
import { IPoll } from '../utils/types';
import { ScrollView } from 'react-native-gesture-handler';

type CreatePollNavigationProp = StackNavigationProp<
  AppStackParamList,
  'MainScreen'
>;

interface IProps {
  navigation: CreatePollNavigationProp;
}

const MainScreen: FC<IProps> = (props: IProps) => {
  const { navigation } = props;

  const { addPoll } = useContext(DBContext);
  const [newPoll, setNewPoll] = useState<IPoll>({
    title: '',
    options: [],
    usersHaveVoted: [],
    answers: [],
  });

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder='title'
        value={newPoll.title}
        onChangeText={(text) => setNewPoll({ ...newPoll, title: text })}
      />
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}></ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title='Add option'
          onPress={() => console.log('adding option')}
        />
        <Button
          title='Create and Replace Poll'
          onPress={() => console.log('updating poll')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    height: '100%',
  },
  scrollViewContainer: {
    paddingTop: 10,

    width: '90%',
    height: '65%',
  },
  scrollView: {
    flex: 1,
  },
  buttonsContainer: {
    paddingVertical: 10,
    width: '90%',
    flex: 1,
    paddingBottom: 30,
  },
});

export default MainScreen;
