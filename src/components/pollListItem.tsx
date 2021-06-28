import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  title: string;
  onChangeText?(text: string): void;
  isText: boolean;
  i?: number;
  removable?: boolean;
  removeItem?(i: number): void;
}

const PollListItem: FC<IProps> = (props: IProps) => {
  const {
    title,
    onChangeText,
    isText,
    i,
    removable = false,
    removeItem,
  } = props;

  return (
    <View style={styles.container}>
      {isText ? (
        <Text style={styles.text}>{`${title}`}</Text>
      ) : (
        <>
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
            maxLength={200}
            //numberOfLines={5}
          />
          {removable && (
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={removeItem ? () => removeItem(i!) : () => null}
            >
              <Ionicons name='trash-outline' size={28} color={colors.red} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 5,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlueDark,
    //height: POLL_LIST_ITEM_HEIGHT,
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  removeIcon: {
    paddingRight: 5,
  },
});

export default PollListItem;
