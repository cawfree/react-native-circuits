import * as React from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';

import Circuit, {Repeater, useWire, useRenderBezier} from '../lib';

import NotGate from './NotGate';

const styles = StyleSheet.create({
  flex: {flex: 1},
  row: {flexDirection: 'row'},
});

export default function Section(): JSX.Element {
  const renderBlackWire = useRenderBezier({
    stroke: "black",
    strokeWidth: "0.5",
  });
  const renderRedWire = useRenderBezier({
    stroke: "red",
    strokeWidth: "0.5",
  });
  const {width, height} = useWindowDimensions();
  const [progress] = React.useState(() => new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [progress, Math.random()]);

  const wire1 = useWire({renderWire: renderBlackWire});
  const wire2 = useWire({renderWire: renderRedWire});
  return (
    <Circuit
      style={StyleSheet.flatten([{ width, height }, styles.row])}
      sensitivityList={[progress]}
    >
      <NotGate size={50} B={wire1} />
      <Repeater
        style={{
          marginLeft: Math.random() * 500,
          marginTop: Math.random() * 500,
        }}
        input={[wire1]}
        output={[wire2]}
      />
      <NotGate size={50} A={wire2} style={{marginLeft: 100}}/>
      <NotGate size={50} A={wire2} style={{marginTop: 100}}/>
    </Circuit>
  );
}
