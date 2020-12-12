# react-native-circuits
Easily layout any component as a schematic using [**FlexBox**](https://reactnative.dev/docs/flexbox) in React Native.

Supports Android, iOS, Web and Expo.

## Getting Started

Using [**Yarn**](https://yarnpkg.com):

```sh
yarn add react-native-svg
yarn add react-native-circuits
```

## Example

To get started out, let's look at drawing a simple wire.

```typescript
import React from 'react';
import {StyleSheet} from 'react-native';
import Circuit, {useRenderBezier, Junction, useWire} from 'react-native-circuits';

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default function App(): JSX.Element {
  // Define a way of drawing a wire.
  const renderBlackBezier = useRenderBezier({stroke: "black", strokeWidth: "0.5"});
  // Define a wire instance and tell it how to be drawn.
  const a = useWire(renderBlackBezier);
  // Below, we use two Junctions (places where a wire can be connected), spread
  // them far apart and connect them together.
  return (
    <Circuit style={StyleSheet.absoluteFill}>
      {/* Use a Junction to connect wires. Here, we connect bottom-to-top. */}
      {/* This would effectively draw a line down the screen. Boring, huh! */}
      <Junction Bottom={[a]} />
      <View style={styles.flex} />
      <Junction Top={[a]} />
    </Circuit>
  );
};
```

Notice that when we declare the `Top`, `Bottom` (or `Left` and `Right`) of a `Junction`, we are permitted to define an array of wires, which allows you to connect multiple wires together.

Check out the complete example [**here**](./example/App.tsx).

## Types

```typescript
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
};

export type JunctionProps = {
  readonly style?: MaybeStyle;
  readonly children?: ReactChildren;
  readonly Top?: readonly Wire[];
  readonly Left?: readonly Wire[];
  readonly Bottom?: readonly Wire[];
  readonly Right?: readonly Wire[];
};

```

## License
[**MIT**](./LICENSE)
