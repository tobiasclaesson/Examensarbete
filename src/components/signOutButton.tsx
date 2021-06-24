import React, { FC, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';
import colors from '../utils/colors';
import { strings } from '../utils/strings';

const SignOutButton: FC<StackHeaderLeftButtonProps> = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={() => signOut()}
      containerStyle={styles.container}
    >
      <Text style={styles.text}>{strings.signOutBtnText.eng}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    padding: 5,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
});

export default SignOutButton;
