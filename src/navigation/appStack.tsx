import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, CreatePollScreen } from '../screens';
import colors from '../utils/colors';

export type AppStackParamList = {
  MainScreen: undefined;
  CreatePollScreen: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const screenOptions = {
  headerTintColor: colors.black,

  headerBackTitle: 'Back',
};

const AppStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='MainScreen'
        component={MainScreen}
        options={{
          title: 'StSo Prio',
        }}
      />
      <Stack.Screen
        name='CreatePollScreen'
        component={CreatePollScreen}
        options={{
          title: 'Create Poll',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
