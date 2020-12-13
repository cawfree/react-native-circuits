import type {ViewStyle} from 'react-native';
import type {PathProps} from 'react-native-svg';

import {WireDirection} from './enums';

export type Point = [x: number, y: number];

export type ReactChildren = JSX.Element | readonly JSX.Element[];

export type MaybeStyle = ViewStyle | readonly ViewStyle[] | undefined;

export type AggregatePoint = {
  readonly wireDirection: WireDirection;
  readonly point: Point;
  readonly wireId: string;
};

export type AggregateLayout = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly pageX: number;
  readonly pageY: number;
};

export type RenderWire = (points: readonly AggregatePoint[]) => JSX.Element;

export type useRenderWireResult = {
  readonly renderWire: RenderWire;
  readonly pathProps: PathProps;
};

export type Wire = useRenderWireResult & {
  readonly wireId: string;
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
  readonly style: MaybeStyle;
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
  readonly style: MaybeStyle;
  readonly wireDirection: WireDirection;
};

export type ModuleProps = {
  readonly style: MaybeStyle;
  readonly terminals?: readonly Terminal[];
  readonly children?: ReactChildren;
};

export type CircuitProviderProps = {
  readonly style?: MaybeStyle;
  readonly children: ReactChildren;
};

export type PointsBuffer = {
  // @ts-ignore
  readonly renderWire: RenderWire;
  readonly [terminalId: string]: AggregatePoint;
};

export type WireBuffer = {
  readonly [wireId: string]: PointsBuffer;
};

export type SvgRenderMethod = (
  layout: AggregateLayout
) => ReactChildren;

export type FitSvgProps = {
  readonly style?: MaybeStyle;
  readonly children?: ReactChildren;
  readonly render?: SvgRenderMethod;
  readonly extraPadding?: number;
};

export type JunctionProps = {
  readonly style?: MaybeStyle;
  readonly children?: ReactChildren;
  readonly Top?: readonly Wire[];
  readonly Left?: readonly Wire[];
  readonly Bottom?: readonly Wire[];
  readonly Right?: readonly Wire[];
};
