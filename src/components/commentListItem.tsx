import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';

interface IProps {
  author: string;
  text: string;
}

const CommentListItem: FC<IProps> = (props: IProps) => {
  const { author, text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.authorText}>From: {author}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 5,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  text: {
    color: colors.black,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexWrap: 'wrap',
  },
  authorText: {
    color: colors.black,
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
});

export default CommentListItem;
