import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

  useEffect(() => {
    getPoll();
  }, []);

  console.log(poll.options);

  if (isLoading) {
    console.log('Returning Splash');

    return <SplashScreen />;
  }
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      <Text>{poll.title}</Text>
      <Text>{strings.mainScreenUnorderedListDesc.eng}</Text>

      <View style={styles.scrollViewContainer}>
        <FlatList
          data={poll.options}
          renderItem={({ item, index }) => (
            <PollListItem title={item.title} isText={true} i={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
  scrollViewContainer: {
    paddingTop: 10,
    width: '90%',
    height: '65%',
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 10,
    width: '80%',
    flex: 1,
    paddingBottom: 30,
  },
});

export default MainScreen;
