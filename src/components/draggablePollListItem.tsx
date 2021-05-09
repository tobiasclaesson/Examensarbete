import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import PollListItem from './pollListItem';
import { POLL_LIST_ITEM_HEIGHT } from '../utils/constants';

interface IProps {
  title: string;
  onChangeText?(text: string): void;
  positions: any;
  id: any;
}

const DraggablePollListItem: FC<IProps> = (props: IProps) => {
  const { title, onChangeText, positions, id } = props;

  return (
    <View
      style={{
        ...styles.container,
        top: positions[id] * POLL_LIST_ITEM_HEIGHT,
      }}
    >
      <PollListItem title={title} onChangeText={onChangeText} isText={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default DraggablePollListItem;
