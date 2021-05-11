import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../utils/colors';
import { POLL_LIST_ITEM_HEIGHT } from '../utils/constants';

interface IProps {
  title: string;
  onChangeText?(text: string): void;
  isText: boolean;
  i?: number;
}

const PollListItem: FC<IProps> = (props: IProps) => {
  const { title, onChangeText, isText, i } = props;

  return (
    <View style={styles.container}>
      {isText ? (
        <Text style={styles.text}>{`${title}`}</Text>
      ) : (
        <TextInput
          style={styles.text}
          placeholder='feature title'
          placeholderTextColor={colors.grey}
          value={title}
          onChangeText={onChangeText}
          keyboardType='default'
          autoCompleteType='off'
          autoCorrect={false}
          autoFocus={true}
        />
      )}
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
    height: POLL_LIST_ITEM_HEIGHT,
  },
  text: {
    color: colors.white,
    width: '90%',
    fontSize: 16,
  },
});

export default PollListItem;
