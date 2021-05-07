import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { Button } from '../components';
import SplashScreen from './splashScreen';
import { DBContext } from '../context/dbContext';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store';

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

  if (isLoading) {
    console.log('Returning Splash');

    return <SplashScreen />;
  }
  if (pollIsLoading) return <SplashScreen />;
  return (
    <View style={styles.container}>
      {userIsAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            title='Create Poll'
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
  buttonContainer: {
    paddingVertical: 10,
    width: '80%',
    flex: 1,
    paddingBottom: 30,
  },
});

export default MainScreen;
