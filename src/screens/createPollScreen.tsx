import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

import { Button, TextInputField } from '../components';
import { DBContext } from '../context/dbContext';
import { IPoll } from '../utils/types';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default MainScreen;
