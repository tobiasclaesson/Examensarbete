import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';
import { IOption } from '../utils/types';

interface IProps {
  indexes: number[];
  place: number;
  options: IOption[];
}

const CandidateResultItem: FC<IProps> = (props: IProps) => {
  const { indexes, place, options } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{place}.</Text>
      <View style={styles.optionsContainer}>
        {indexes.map((i) => (
          <View
            key={i.toString()}
            style={indexes.length > 1 && i < indexes.length && styles.seperator}
          >
            <Text style={styles.text}>{options[i].title}</Text>
            {/* {indexes.length > 1 && i < indexes.length && (
              <Text key={String(i + 1)} style={styles.text}>
                --------------------------------------
              </Text>
            )} */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.brandBlueDark,
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  seperator: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});

export default CandidateResultItem;
