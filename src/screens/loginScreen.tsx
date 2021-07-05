import React, { FC, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
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
    <View
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
      }}
    >
      <TouchableWithoutFeedback
        style={{
          height: Platform.OS === 'web' ? '100vh' : '100%',
        }}
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
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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

export default LoginScreen;
