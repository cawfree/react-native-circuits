import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import {CircuitsContext} from '../contexts';
import {useCircuits} from '../hooks';
import {
  CircuitsContextValue,
  CircuitsProviderProps,
  useWireResult,
  WireNodes,
  WireRenderNode,
  Node,
} from "../types";

const defaultState = Object.freeze({}) as WireNodes;

export default function CircuitsProvider({
  children,
}: CircuitsProviderProps): JSX.Element {
  const defaultValue = useCircuits();
  const [wireNodes, setWireNodes] = React.useState<WireNodes>(
    defaultState,
  );
  // TODO: need an onDelete too (purge the wires).
  const shouldUpdateWireNodes = React.useCallback(
    (node: Node, {wireId, renderWire}: useWireResult) => {
      setWireNodes((currentWireNodes: WireNodes) => {
        let currentNode = currentWireNodes[wireId];
        if (!currentNode) {
          currentNode = {
            renderWire,
            nodes: {},
          };
        }
        const {nodes: currentNodes} = currentNode;
        const nextNode = {
          ...currentNode,
          renderWire,
          nodes: {
            ...currentNodes,
            [node.nodeId]: node,
          },
        } as WireRenderNode;
        return {
          ...currentWireNodes,
          [wireId]: nextNode,
        } as WireNodes;
      });
    },
    [setWireNodes]
  );
  const onElementBounds = React.useCallback(
    (node: Node, wire: useWireResult) => {
      shouldUpdateWireNodes(node, wire);
    },
    [shouldUpdateWireNodes],
  );
  const value = React.useMemo((): CircuitsContextValue => ({
    ...defaultValue,
    onElementBounds,
  }), [defaultValue, onElementBounds]);
  return (
    <CircuitsContext.Provider value={value}>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {Object.entries(wireNodes).map(([k, { renderWire, nodes }]) => (
          <React.Fragment key={`k${k}`}>{renderWire(nodes)}</React.Fragment>
        ))}
      </View>
      {children}
    </CircuitsContext.Provider>
  );
}
