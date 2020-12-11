import type {ViewStyle, LayoutChangeEvent, Animated} from 'react-native';

import {WireDirection} from './enums';

export type RenderWireNodes = (nodes: Nodes) => JSX.Element;

export type Node = {
  readonly nodeId: string;
  readonly layout: LayoutChangeEvent;
  readonly wireDirection: WireDirection;
};

export type Nodes = {
  readonly [elementNodeId: string]: Node;
};

export type useWireResult = {
  readonly wireId: string;
  readonly renderWire: RenderWireNodes;
};

export type useWireParams = {
  readonly renderWire: RenderWireNodes;
};

export type WireConfig = Animated.ViewStyle & {
  readonly wireDirection: WireDirection;
};

export type Wire = readonly [useWireResult, WireConfig];
export type Wires = readonly Wire[];

export type CircuitsContextValue = {
  readonly onElementBounds: (node: Node, wire: useWireResult) => void;
};

export type WireRenderNode = {
  readonly nodes: Nodes;
  readonly renderWire: RenderWireNodes;
};

export type WireNodes = {
  readonly [wireId: string]: WireRenderNode;
};

export type ElementProps = {
  readonly style?: ViewStyle;
  readonly wires: Wires;
  readonly children: JSX.Element;
};

export type CircuitsProviderProps = {
  readonly children: JSX.Element | readonly JSX.Element[];
};

export type NodePoint = [x: number, y: number];
