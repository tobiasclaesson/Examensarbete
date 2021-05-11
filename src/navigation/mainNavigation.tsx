import React, { FC, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import { SplashScreen } from '../screens';
import { AuthContext } from '../context/authContext';

const MainNavigation: FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    console.log('isloading, returning splash');

    return <SplashScreen />;
  }

  console.log('is nog loading, returning app');

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
