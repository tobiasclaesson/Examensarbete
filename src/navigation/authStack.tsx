import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen, LoginScreen } from '../screens';
import colors from '../utils/colors';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const screenOptions = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.brandBlue,
  },
  headerBackTitle: 'Back',
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name='Login'
        component={LoginScreen}
        initialParams={undefined}
        options={{
          title: 'StSo Prio',
        }}
      />
      <Screen
        name='Signup'
        component={SignupScreen}
        initialParams={undefined}
        options={{
          title: 'StSo Prio',
          headerTitleStyle: {
            color: colors.white,
          },
        }}
      />
    </Navigator>
  );
};

export default AuthStack;
