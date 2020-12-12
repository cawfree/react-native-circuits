import type {ViewStyle} from 'react-native';
import type {PathProps} from 'react-native-svg';

import {WireDirection} from './enums';

export type Point = [x: number, y: number];

export type ReactChildren = JSX.Element | readonly JSX.Element[];

export type AggregatePoint = {
  readonly wireDirection: WireDirection;
  readonly point: Point;
};

export type RenderWire = (points: readonly AggregatePoint[]) => JSX.Element;

export type useWireParams = {
  readonly renderWire: RenderWire;
};

export type Wire = {
  readonly wireId: string;
  readonly renderWire: RenderWire;
};

export type CircuitContextValue = {
  readonly onTerminalMoved: (
    terminalId: string,
    wire: Wire,
    wireDirection: WireDirection,
    point: Point,
  ) => void;
  readonly onTerminalsDestroyed: (terminalId: readonly string[]) => void;
};

export type ActiveComponentProps = {
  readonly style: ViewStyle;
  readonly children?: ReactChildren;
  readonly onMeasureBounds: (
    x: number,
    y: number,
    width: number,
    height: number,
    pageX: number,
    pageY: number
  ) => void;
};

export type Terminal = {
  readonly wire: Wire;
  readonly style: ViewStyle;
  readonly wireDirection: WireDirection;
};

export type ModuleProps = {
  readonly style: ViewStyle | readonly ViewStyle[];
  readonly terminals?: readonly Terminal[];
  readonly children?: ReactChildren;
};

export type CircuitProviderProps = {
  readonly style?: ViewStyle;
  readonly children: ReactChildren;
};

export type PointsBuffer = {
  readonly renderWire: RenderWire;
  readonly [terminalId: string]: AggregatePoint;
};

export type WireBuffer = {
  readonly [wireId: string]: PointsBuffer;
};
