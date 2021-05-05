import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../utils/colors';

interface IProps {
  title: string;
  onPress: () => void | void;
}

const Button: FC<IProps> = (props: IProps) => {
  const { title, onPress } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  text: {
    padding: 15,
    paddingHorizontal: 20,
    color: colors.white,
  },
});

export default Button;
