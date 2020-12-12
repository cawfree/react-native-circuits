import * as React from "react";
import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

import { Module } from "../components";
import { WireDirection } from "../types/enums";
import { Terminal, Wire } from "../types";

export type RepeaterProps = {};

function Repeater({
  style,
  Inputs,
  Outputs,
}: {
  readonly style?: ViewStyle;
  readonly Inputs: readonly Wire[];
  readonly Outputs: readonly Wire[];
}): JSX.Element {
  const terminals = React.useMemo((): readonly Terminal[] => {
    return [
      ...Inputs.map((e) => {
        return {
          wire: e,
          wireDirection: WireDirection.SINK,
          style: {
            position: "absolute",
            left: 0,
          },
        };
      }),
      ...Outputs.map((e) => {
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
  }, [Inputs, Outputs]);
  return (
    <Module
      style={StyleSheet.flatten([style, { width: 0, height: 0 }])}
      terminals={terminals}
    />
  );
}

export default React.memo(Repeater);
