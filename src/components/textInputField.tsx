import React, { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colors';

interface IProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address';
  shouldAutoFocus?: boolean;
}

const TextInputField: FC<IProps> = (props: IProps) => {
  const {
    placeholder,
    value,
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
        value={value}
        onChangeText={(text) => onChangeText(text)}
        secureTextEntry={secureTextEntry || false}
        keyboardType={keyboardType || 'default'}
        autoCompleteType='off'
        autoCorrect={false}
        autoCapitalize='none'
        autoFocus={shouldAutoFocus || false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.textInputBackground,
    borderRadius: 5,
    marginVertical: 5,
  },
  textInput: { padding: 15, minHeight: 45 },
});

export default TextInputField;
