import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { Button, PollListItem, TextInputField } from '../components';
import SplashScreen from './splashScreen';
import { DBContext } from '../context/dbContext';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../store';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { strings } from '../utils/strings';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { IOption } from '../utils/types';
import * as Actions from '../store/actions';
import { userHaveVoted } from '../utils/common';

type MainScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'MainScreen'
>;

interface IProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: FC<IProps> = (props: IProps) => {
  const { navigation } = props;

  const { user, userIsAdmin, isLoading } = useContext(AuthContext);
  const { getPoll, pollIsLoading, addAnswer } = useContext(DBContext);
  const dispatch = useDispatch();

  const { poll } = useSelector((state: ReducerState) => state.pollReducer);

  const [comment, setComment] = useState<string>('');
  const [usersOptionOrder, setUsersOptionsOrder] = useState<IOption[]>(
    poll.options
  );

  useEffect(() => {
    if (userHaveVoted(poll, user)) navigation.navigate('ResultScreen');
  });

  useEffect(() => {
    setUsersOptionsOrder(poll.options);
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  type Item = {
    title: string;
  };
  const renderItem = useCallback(
    ({ item, index, drag }: RenderItemParams<Item>) => {
      return (
        <TouchableOpacity onLongPress={drag}>
          <PollListItem title={item.title} isText={true} i={index} />
        </TouchableOpacity>
      );
    },
    []
  );

  /* const userHaveVoted = (): boolean => {
    const userID = user?.uid;
    let userHaveVoted = false;

    poll.usersHaveVoted.forEach((id) => {
      if (userID === id) {
        userHaveVoted = true;
      }
    });
    return userHaveVoted;
  }; */

  const submitAlert = () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Submit',
        'Please note that you will not be able to edit your answers after clicking on submit',
        [
          { text: 'Cancel' },
          {
            text: 'Submit',
            onPress: () =>
              addAnswer(
                user?.email || '',
                usersOptionOrder,
                comment,
                new Date(),
                () => navigation.navigate('ResultScreen')
              ),
          },
        ]
      );
    } else {
      addAnswer(user?.email || '', usersOptionOrder, comment, new Date(), () =>
        navigation.navigate('ResultScreen')
      );
    }
  };

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  return (
    <TouchableWithoutFeedback
      style={{ height: Platform.OS === 'web' ? '93vh' : '100%' }}
      onPress={Platform.OS === 'web' ? () => null : Keyboard.dismiss}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={120}
          style={{ flex: 24, alignItems: 'center', width: '100%' }}
        >
          <View style={styles.scrollViewContainer}>
            <Text style={styles.descText}>
              {strings.mainScreenUnorderedListDesc.eng}
            </Text>
            <DraggableFlatList
              style={styles.scrollView}
              data={usersOptionOrder}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              onDragEnd={({ data }) =>
                dispatch(Actions.updatePoll({ ...poll, options: data }))
              }
            />
            <TextInputField
              placeholder='comment'
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            {userIsAdmin && (
              <Button
                title={strings.mainScreenCreatePollButton.eng}
                onPress={() => navigation.navigate('CreatePollScreen')}
              />
            )}

            <Button
              title={strings.mainScreenSubmitButton.eng}
              onPress={() => submitAlert()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  headerText: {
    color: colors.black,
    fontSize: 34,
  },
  descText: {
    color: colors.black,
    fontSize: 18,
    alignSelf: 'center',
    overflow: 'visible',
    paddingVertical: 5,
    paddingTop: 10,
  },
  scrollViewContainer: {
    paddingTop: 10,
    width: '90%',
    maxWidth: 800,
    flex: 18,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
    width: '90%',
    maxWidth: 800,
    flex: 6,
    paddingBottom: 30,
    justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default MainScreen;
