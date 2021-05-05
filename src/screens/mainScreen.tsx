import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AppStackParamList } from '../navigation/appStack';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';
import { AuthContext } from '../context/authContext';
import { Button } from '../components';
import SplashScreen from './splashScreen';

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

  if (isLoading) {
    console.log('Returning Splash');

    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <Button
        title='Create Poll'
        onPress={() => console.log('Creating pollololol')}
      />
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
