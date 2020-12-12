import * as React from 'react';
import {StyleSheet} from 'react-native';
import type {ViewStyle} from 'react-native';

import {Module} from '../components';
import {WireDirection} from '../types/enums';
import {Terminal, Wire} from '../types';

export type RepeaterProps = {
};

function Repeater({
  style,
  input,
  output,
} : {
  readonly style?: ViewStyle;
  readonly input: readonly Wire[];
  readonly output: readonly Wire[];
}): JSX.Element {
  const terminals = React.useMemo((): readonly Terminal[] => {
    return [
      ...input.map((e) => {
        return {
          wire: e,
          wireDirection: WireDirection.SINK,
          style: {
            position: "absolute",
            left: 0,
          },
        };
      }),
      ...output.map((e) => {
        return {
          wire: e,
          wireDirection: WireDirection.SOURCE,
          style: {
            position: "absolute",
            right: 0,
          },
        };
      }),
    ] as readonly Terminal[];
  }, [input, output]);
  return (
    <Module
      style={StyleSheet.flatten([style, { width: 0, height: 0 }])}
      terminals={terminals}
    />
  );
}

export default React.memo(Repeater);
