import React, { FC, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/authStack';
import { TextInputField, Button } from '../components';
import { AuthContext } from '../context/authContext';
import colors from '../utils/colors';
import { strings } from '../utils/strings';

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

interface IProps {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: FC<IProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInputField
        placeholder='Password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={strings.signupScreenCancelButton.eng}
          onPress={() => props.navigation.navigate('Login')}
        />
        <Button
          title={strings.signupScreenSignUpButton.eng}
          onPress={() => {
            signUp(email, password);
          }}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default SignupScreen;
