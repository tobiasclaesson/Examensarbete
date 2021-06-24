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
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontSize: 24,
    padding: 50,
  },
});

export default SplashScreen;
