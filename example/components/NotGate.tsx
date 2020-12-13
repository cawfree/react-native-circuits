import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import type {ViewStyle} from 'react-native';

//import {Module, WireDirection} from "react-native-circuits";
//import type {Wire, Terminal} from 'react-native-circuits/dist/types';

import {Module, WireDirection} from "../lib";
import type {Wire, Terminal} from '../lib/types';

export default function NotGate({
  style,
  Input,
  Output,
  size,
}: {
  readonly style?: ViewStyle;
  readonly Input?: Wire;
  readonly Output?: Wire;
  readonly size: number;
}): JSX.Element {
  const terminals = React.useMemo(
    () => [
      {
        wire: Input,
        wireDirection: WireDirection.SINK,
        style: {
          position: "absolute",
          top: size * 0.5,
        },
      },
      {
        wire: Output,
        wireDirection: WireDirection.SOURCE,
        style: {
          position: "absolute",
          top: size * 0.5,
          right:  0,
        },
      },
    ] as readonly Terminal[],
    [size, Input, Output]
  );
  return (
    <Module style={[style, {width: size, height: size}]} terminals={terminals}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{
          uri: "https://freesvg.org/img/electronic-logic-inverter.png",
        }}
      />
    </Module>
  );
}
