import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { Button, PollListItem } from '../components';
import SplashScreen from './splashScreen';
import { DBContext } from '../context/dbContext';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { strings } from '../utils/strings';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { IOption } from '../utils/types';
import * as Actions from '../store/actions';

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

  const [usersOptionOrder, setUsersOptionsOrder] = useState<IOption[]>(
    poll.options
  );

  useEffect(() => {
    if (userHaveVoted()) navigation.navigate('ResultScreen');
  });

  useEffect(() => {
    setUsersOptionsOrder(poll.options);
  }, [poll]);

  useEffect(() => {
    getPoll();
  }, []);

  /* function listToObject(list: any) {
    const values = Object.values(list);
    const object = {};

    for (let i = 0; i < values.length; i++) {
      object[values[i].id] = i;
    }
    console.log(object);

    return object;
  } */

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

  const userHaveVoted = (): boolean => {
    const userID = user?.uid;
    let userHaveVoted = false;

    poll.usersHaveVoted.forEach((id) => {
      if (userID === id) {
        userHaveVoted = true;
      }
    });
    return userHaveVoted;
  };

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  // if (userHaveVoted()) return <ResultScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{poll.title}</Text>
      </View>

      <View style={styles.scrollViewContainer}>
        <Text style={styles.descText}>
          {strings.mainScreenUnorderedListDesc.eng}
        </Text>
        <DraggableFlatList
          data={usersOptionOrder}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          onDragEnd={({ data }) =>
            dispatch(Actions.updatePoll({ ...poll, options: data }))
          }
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
          onPress={() =>
            addAnswer(usersOptionOrder, () =>
              navigation.navigate('ResultScreen')
            )
          }
        />
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  },
});

export default MainScreen;
