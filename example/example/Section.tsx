import * as React from 'react';
import {Animated, View, Image, StyleSheet, useWindowDimensions} from 'react-native';

import Circuit, {Module, WireDirection, useWire, useRenderWire} from '../lib';

import NotGate from './NotGate';

const styles = StyleSheet.create({
  flex: {flex: 1},
  row: {flexDirection: 'row'},
});

export default function Section(): JSX.Element {
  const renderWire = useRenderWire({
    stroke: "black",
    strokeWidth: "0.4",
  });
  const wire = useWire({renderWire});
  const {width, height} = useWindowDimensions();
  const [progress] = React.useState(() => new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [progress]);
  return (
    <Circuit style={StyleSheet.flatten([{ width, height }, styles.row])} sensitivityList={[progress]}>
      <NotGate
        style={{
          transform: [
            {translateY: Animated.multiply(Animated.subtract(1, progress), height)},
          ],
        }}
        size={100}
        B={wire}
      />
      <View style={styles.flex} />
      <NotGate
        style={{
          transform: [
            {translateY: Animated.multiply(progress, height)},
          ],
        }}
        size={50}
        A={wire}
      />
    </Circuit>
  );
}
