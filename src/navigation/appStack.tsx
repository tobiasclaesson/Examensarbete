import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens';
import colors from '../utils/colors';

export type AppStackParamList = {
  MainScreen: undefined;
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
    </Stack.Navigator>
  );
};

export default AppStack;
