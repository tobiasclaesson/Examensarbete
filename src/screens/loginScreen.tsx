import React, { FC, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { TextInputField, Button } from '../components';
import { AuthContext } from '../context/authContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/authStack';
import colors from '../utils/colors';
import { strings } from '../utils/strings';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
    <TouchableWithoutFeedback
      style={{ height: '100%' }}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={120}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <View style={styles.inputContainer}>
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
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.loginScreenSignUpButton.eng}
              onPress={() => props.navigation.navigate('Signup')}
            />
            <Button
              title={strings.loginScreenSignInButton.eng}
              onPress={() => {
                signIn(email, password);
              }}
            />
          </View>
          <Button
            title='LOGIN TEST USER'
            onPress={() => signIn('t@c.com', '123456')}
          />
        </KeyboardAvoidingView>
        {/* FOR TESTING */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  inputContainer: {
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
