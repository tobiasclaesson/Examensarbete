import React, { FC, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputField, Button } from '../components';
import { AuthContext } from '../context/authContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/authStack';
import colors from '../utils/colors';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface IProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: FC<IProps> = (props: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType={'email-address'}
      />
      <TextInputField
        placeholder='Password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          title='Sign Up'
          onPress={() => props.navigation.navigate('Signup')}
        />
        <Button
          title='Sign In'
          onPress={() => {
            signIn(email, password);
          }}
        />
      </View>
      {/* FOR TESTING */}
      <Button
        title='LOGIN TEST USER'
        onPress={() => signIn('t@c.com', '123456')}
      />
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

export default LoginScreen;
