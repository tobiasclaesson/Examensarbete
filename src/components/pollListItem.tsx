import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../utils/colors';

interface IProps {
  title: string;
  onChangeText: (text: string) => void;
}

const PollListItem: FC<IProps> = (props: IProps) => {
  const { title, onChangeText } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='feature title'
        placeholderTextColor={colors.grey}
        value={title}
        onChangeText={(text) => onChangeText(text)}
        keyboardType='default'
        autoCompleteType='off'
        autoCorrect={false}
        autoFocus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 5,
    paddingVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlueDark,
  },
  textInput: {
    padding: 10,
    paddingVertical: 15,

    color: colors.white,
    width: '90%',
  },
});

export default PollListItem;
