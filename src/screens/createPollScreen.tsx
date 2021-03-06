import React, { FC, useContext, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

import { Button, PollListItem, TextInputField } from '../components';
import { DBContext } from '../context/dbContext';
import { IOption } from '../utils/types';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
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
  const scrollViewRef = useRef<ScrollView>(null);

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
      () => navigation.navigate('MainScreen')
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
    <TouchableWithoutFeedback
      style={{ height: Platform.OS === 'web' ? '93vh' : '100%' }}
      onPress={Platform.OS === 'web' ? () => null : Keyboard.dismiss}
    >
      <View style={styles.container}>
        <View style={styles.titleInputContainer}>
          <TextInputField
            placeholder='title'
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={120}
          style={{ flex: 9, alignItems: 'center', width: '100%' }}
        >
          <View style={styles.scrollViewContainer}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current!.scrollToEnd()}
              onLayout={() => scrollViewRef.current!.scrollToEnd()}
              style={styles.scrollView}
            >
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
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
    width: '100%',
    backgroundColor: colors.lightGrey,
  },
  titleInputContainer: {
    width: '90%',
    maxWidth: 800,
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: 10,
    width: '90%',
    maxWidth: 800,
    flex: 7,
  },
  scrollView: {
    flex: 1,
  },
  buttonsContainer: {
    paddingVertical: 10,
    width: '90%',
    maxWidth: 800,
    flex: 2,
    paddingBottom: 30,
  },
});

export default MainScreen;
