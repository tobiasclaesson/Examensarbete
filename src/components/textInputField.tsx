import React, { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colors';

interface IProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address';
  shouldAutoFocus?: boolean;
}

const TextInputField: FC<IProps> = (props) => {
  const {
    placeholder,
    onChangeText,
    secureTextEntry,
    keyboardType,
    shouldAutoFocus,
  } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        secureTextEntry={secureTextEntry || false}
        keyboardType={keyboardType || 'default'}
        autoCompleteType='off'
        autoCorrect={false}
        autoFocus={shouldAutoFocus || false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.textInputBackground,
    borderRadius: 5,
    marginVertical: 5,
  },
  textInput: { padding: 15 },
});

export default TextInputField;
