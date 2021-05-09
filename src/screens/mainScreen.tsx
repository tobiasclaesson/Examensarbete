import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
  Animated,
} from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { Button, PollListItem } from '../components';
import SplashScreen from './splashScreen';
import { DBContext } from '../context/dbContext';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store';
import { ScrollView } from 'react-native-gesture-handler';
import { strings } from '../utils/strings';
import { POLL_LIST_ITEM_HEIGHT } from '../utils/constants';
import PollFlatlist from '../components/pollFlatlist';
import DraggablePollListItem from '../components/draggablePollListItem';

type MainScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'MainScreen'
>;

interface IProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: FC<IProps> = (props: IProps) => {
  const { navigation } = props;

  const { userIsAdmin, isLoading, signOut } = useContext(AuthContext);
  const { getPoll, pollIsLoading } = useContext(DBContext);

  const { poll } = useSelector((state: ReducerState) => state.pollReducer);
  const positions = useRef(listToObject(poll.options)).current;

  useEffect(() => {
    getPoll();
  }, []);

  function listToObject(list: any) {
    const values = Object.values(list);
    const object = {};

    for (let i = 0; i < values.length; i++) {
      object[values[i].id] = i;
    }
    console.log(object);

    return object;
  }

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{poll.title}</Text>
        <Text>{strings.mainScreenUnorderedListDesc.eng}</Text>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={{
            height: poll.options.length * POLL_LIST_ITEM_HEIGHT,
          }}
        >
          {poll.options.map((option, i) => (
            <DraggablePollListItem
              title={option.title}
              positions={positions}
              id={i}
            />
          ))}
        </ScrollView>
      </View>
      {userIsAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            title={strings.mainScreenCreatePollButton.eng}
            onPress={() => navigation.navigate('CreatePollScreen')}
          />
          <Button
            title={strings.mainScreenSubmitButton.eng}
            onPress={() => navigation.navigate('CreatePollScreen')}
          />
        </View>
      )}
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
  header: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: 10,
    width: '90%',
    flex: 6,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 10,
    width: '80%',
    flex: 2,
    paddingBottom: 30,
    backgroundColor: 'yellow',
  },
});

export default MainScreen;
