import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

import { Button, PollListItem, TextInputField } from '../components';
import { DBContext } from '../context/dbContext';
import { IPoll } from '../utils/types';
import { ScrollView } from 'react-native-gesture-handler';
import { updatePoll } from '../store/actions';
import { checkArrayForDuplicates } from '../utils/common';

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

  const [title, setTitle] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  console.log(options);

  const addOption = () => {
    setOptions([...options, '']);
  };
  const setOption = (text: string, optionIndex: number) => {
    setOptions((prevState) => {
      const opt = prevState.map((option, i) => {
        if (optionIndex === i) {
          return text;
        } else {
          return option;
        }
      });
      return opt;
    });
  };

  enum EAlertTypes {
    Title = 'TITLE',
    MissingOptions = 'MISSING_OPTIONS',
    DuplicateOptions = 'DUPLICATE_OPTIONS',
  }
  const createAlert = (type: string) => {
    let msg = '';
    switch (type) {
      case EAlertTypes.Title: {
        msg = 'There are empty titles, please correct before updating poll';
        break;
      }
      case EAlertTypes.MissingOptions: {
        msg =
          'There are to few options, please add options before updating poll';
        break;
      }
      case EAlertTypes.DuplicateOptions: {
        msg =
          'There is a duplicate in options, please correct before updating poll';
        break;
      }
    }
    Alert.alert('Error', msg, [{ text: 'OK' }]);
  };
  const updatePoll = () => {
    if (options.length < 2) {
      createAlert(EAlertTypes.MissingOptions);
      return;
    }
    if (title === '') {
      createAlert(EAlertTypes.Title);
      return;
    }
    let optionTitleEmpty = false;
    options.forEach((option) => {
      if (option === '') {
        optionTitleEmpty = true;
      }
    });
    if (optionTitleEmpty) {
      createAlert(EAlertTypes.Title);
      return;
    }
    if (checkArrayForDuplicates(options)) {
      createAlert(EAlertTypes.DuplicateOptions);
      return;
    }

    addPoll(
      { title: title, options: options, usersHaveVoted: [], answers: [] },
      () => navigation.goBack()
    );
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder='title'
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          {options.map((option, i) => (
            <PollListItem
              key={i}
              title={option}
              onChangeText={(text) => setOption(text, i)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title='Add option' onPress={() => addOption()} />
        <Button title='Create and Replace Poll' onPress={() => updatePoll()} />
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
    backgroundColor: colors.lightGrey,
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
