import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PanResponder,
  PanResponderInstance,
  Animated,
  Dimensions,
} from 'react-native';
import PollListItem from './pollListItem';
import { IOption } from '../utils/types';

const screen = Dimensions.get('screen').height;

interface IProps {
  options: IOption[];
}

export default class PollFlatlist extends React.Component<IProps> {
  state = {
    dragging: false,
  };

  options: IOption[];

  _panResponder: PanResponderInstance;
  point = new Animated.ValueXY();

  constructor(props: IProps) {
    super(props);
    this.options = props.options;

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        this.setState({ dragging: true });
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
          y: gestureState.moveY,
        });
        console.log(gestureState);

        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const { dragging } = this.state;

    console.log(screen);

    console.log(this.options);

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            backgroundColor: 'black',
            zIndex: 2,
            top: this.point.getLayout().top,
          }}
        >
          <Text>Hello</Text>
        </Animated.View>
        <FlatList
          data={this.options}
          renderItem={({ item, index }) => (
            <View {...this._panResponder.panHandlers}>
              <PollListItem title={item.title} isText={true} i={index} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
