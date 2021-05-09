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

  const { userIsAdmin, isLoading } = useContext(AuthContext);
  const { getPoll, pollIsLoading, addAnswer } = useContext(DBContext);
  const dispatch = useDispatch();

  const { poll } = useSelector((state: ReducerState) => state.pollReducer);

  const [usersOptionOrder, setUsersOptionsOrder] = useState<IOption[]>(
    poll.options
  );

  console.log(usersOptionOrder);

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
        <TouchableOpacity onPress={drag}>
          <PollListItem title={item.title} isText={true} i={index} />
        </TouchableOpacity>
      );
    },
    []
  );

  if (isLoading) return <SplashScreen />;
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{poll.title}</Text>
        <Text>{strings.mainScreenUnorderedListDesc.eng}</Text>
      </View>

      <View style={styles.scrollViewContainer}>
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
          onPress={() => addAnswer(usersOptionOrder)}
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
  },
});

export default MainScreen;
