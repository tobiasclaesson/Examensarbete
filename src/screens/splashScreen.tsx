import React, { FC } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../utils/colors';

const SplashScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StSo Prio</Text>
      <ActivityIndicator animating={true} size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 24,

    padding: 30,
  },
});

export default SplashScreen;
