import React, { FC, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/authStack';
import { TextInputField, Button } from '../components';
import { AuthContext } from '../context/authContext';
import colors from '../utils/colors';
import { strings } from '../utils/strings';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
  const [passwordRepetition, setPasswordRepetition] = useState('');
  const { signUp } = useContext(AuthContext);

  const signUpUser = () => {
    if (password === passwordRepetition) {
      signUp(email, password);
    } else {
      Alert.alert('Error', 'Passwords are not matching!', [{ text: 'OK' }]);
    }
  };

  return (
    <TouchableWithoutFeedback
      style={{ height: Platform.OS === 'web' ? '93vh' : '100%' }}
      onPress={Platform.OS === 'web' ? () => null : Keyboard.dismiss}
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
            <TextInputField
              placeholder='Repeat Password'
              value={passwordRepetition}
              onChangeText={(text) => setPasswordRepetition(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={strings.signupScreenCancelButton.eng}
              onPress={() => props.navigation.navigate('Login')}
            />
            <Button
              title={strings.signupScreenSignUpButton.eng}
              onPress={() => {
                signUpUser();
              }}
            />
          </View>
        </KeyboardAvoidingView>
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
    maxWidth: 800,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    maxWidth: 800,
    justifyContent: 'space-between',
  },
});

export default SignupScreen;
