import * as React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import type {ViewStyle} from 'react-native';

import {Module, WireDirection} from '../lib';
import type {Wire} from '../lib/types';

export default function NotGate({
  style,
  A,
  B,
  size,
}: {
  readonly style?: Animated.ViewStyle;
  readonly A?: Wire;
  readonly B?: Wire;
  readonly size: number;
}): JSX.Element {
  const terminals = React.useMemo(
    () => [
      {
        wire: A,
        wireDirection: WireDirection.SINK,
        style: {
          position: "absolute",
          top: size * 0.5,
        },
      },
      {
        wire: B,
        wireDirection: WireDirection.SOURCE,
        style: {
          position: "absolute",
          top: size * 0.5,
          right:  0,
        },
      },
    ],
    [size, A, B]
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
