import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

import { Button, PollListItem, TextInputField } from '../components';
import { DBContext } from '../context/dbContext';
import { IOption, IPoll } from '../utils/types';
import { ScrollView } from 'react-native-gesture-handler';
import { updatePoll } from '../store/actions';
import { checkArrayForDuplicates } from '../utils/common';
import { strings } from '../utils/strings';

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
  const [options, setOptions] = useState<IOption[]>([]);

  const addOption = () => {
    setOptions([...options, { title: '' }]);
  };
  const setOption = (text: string, optionIndex: number) => {
    setOptions((prevState) => {
      const opt = prevState.map((option, i) => {
        if (optionIndex === i) {
          return { title: text };
        } else {
          return option;
        }
      });
      return opt;
    });
  };

  enum EAlertTypes {
    Title,
    MissingOptions,
    DuplicateOptions,
  }
  const createAlert = (type: EAlertTypes) => {
    let msg = '';
    switch (type) {
      case EAlertTypes.Title: {
        msg = strings.createPollScreenAlertTypeTitleMsg.eng;
        break;
      }
      case EAlertTypes.MissingOptions: {
        msg = strings.createPollScreenAlertTypeMissingOptionMsg.eng;
        break;
      }
      case EAlertTypes.DuplicateOptions: {
        msg = strings.createPollScreenAlertTypeDuplicateMsg.eng;
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
      if (option.title === '') {
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

  const removeItem = (i: number) => {
    const array = options.filter((item, index) => {
      console.log(i, index);
      return i !== index;
    });
    setOptions(array);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleInputContainer}>
        <TextInputField
          placeholder='title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          {options.map((option, i) => (
            <PollListItem
              key={i}
              title={option.title}
              onChangeText={(text) => setOption(text, i)}
              isText={false}
              i={i}
              removeItem={removeItem}
              removable
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title={strings.createPollScreenAddOptionButton.eng}
          onPress={() => addOption()}
        />
        <Button
          title={strings.createPollScreenUpdatePollButton.eng}
          onPress={() => updatePoll()}
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
    backgroundColor: colors.lightGrey,
  },
  titleInputContainer: {
    width: '90%',
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
