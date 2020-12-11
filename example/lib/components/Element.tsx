import * as React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { nanoid } from "nanoid/non-secure";

import { Node, ElementProps, Wire } from "../types";
import { useCircuits } from "../hooks";

export default function Element({
  style,
  wires,
  children,
}: ElementProps): JSX.Element {
  const { onElementBounds } = useCircuits();
  const elementId = React.useMemo(nanoid, []);
  const toElementNodeId = React.useCallback(
    (index: number): string => `${elementId}.${index}`,
    [elementId]
  );
  return (
    <Animated.View style={style}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {wires.map(([wire, nodeStyle]: Wire, index: number) => {
          const { wireDirection } = nodeStyle;
          const nodeId = toElementNodeId(index);
          return (
            <Animated.View
              key={nodeId}
              style={nodeStyle}
              onLayout={(layout) =>
                onElementBounds({ nodeId, wireDirection, layout }, wire)
              }
            />
          );
        })}
      </View>
    </Animated.View>
  );
}
