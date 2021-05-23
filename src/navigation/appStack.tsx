import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, CreatePollScreen, ResultScreen } from '../screens';
import colors from '../utils/colors';
import SignOutButton from '../components/signOutButton';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store';

export type AppStackParamList = {
  MainScreen: undefined;
  CreatePollScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const screenOptions = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.brandBlue,
  },
  headerBackTitle: 'Back',
};

const AppStack: FC = () => {
  const { poll } = useSelector((state: ReducerState) => state.pollReducer);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='MainScreen'
        component={MainScreen}
        options={{
          title: poll.title || 'StSo Prio',

          headerLeft: (props) => <SignOutButton {...props} />,
        }}
      />
      <Stack.Screen
        name='CreatePollScreen'
        component={CreatePollScreen}
        options={{
          title: 'Create Poll',
        }}
      />
      <Stack.Screen
        name='ResultScreen'
        component={ResultScreen}
        options={{
          title: 'Poll Result',
          headerLeft: (props) => <SignOutButton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
