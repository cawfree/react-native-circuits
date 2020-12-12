import * as React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

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
  const wire1 = useWire({renderWire: renderBlackWire});
  const wire2 = useWire({renderWire: renderRedWire});

  return (
    <Circuit style={StyleSheet.flatten([{ width, height }, styles.row])}>
      <NotGate size={50} B={wire1} />
      <Repeater
        style={{
          marginLeft: Math.random() * 200,
          marginTop: Math.random() * 200,
        }}
        input={[wire1]}
        output={[wire2]}
      />
      <NotGate size={50} A={wire2} style={{marginLeft: Math.random() * 100}}/>
      <NotGate size={50} A={wire2} style={{marginTop: Math.random() * 100}}/>
    </Circuit>
  );
}
