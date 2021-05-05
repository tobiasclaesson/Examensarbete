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
        <Button
          title='Create Poll'
          onPress={() => navigation.navigate('CreatePollScreen')}
        />
      )}
      <Text style={{ color: colors.black }}>{poll.title}</Text>
      <Button title='Sign Out' onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default MainScreen;
