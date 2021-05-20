import React, { FC, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
  const { signUp } = useContext(AuthContext);

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
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default SignupScreen;
