import * as React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import Svg from 'react-native-svg';

import {CircuitContext} from '../contexts';
import {useCircuit} from '../hooks';
import type {AggregatePoint, CircuitProviderProps, Point, PointsBuffer, Wire, WireBuffer} from '../types';
import {WireDirection} from '../types/enums';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function CircuitProvider({
  sensitivityList,
  style,
  children,
}: CircuitProviderProps): JSX.Element {
  const ref = React.useRef<View>();
  const defaultValue = useCircuit();
  const [wireBuffer, setWireBuffer] = React.useState<WireBuffer>({});
  const [layout, setLayout] = React.useState(null);
  const onMeasureLayout = React.useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => {
      setLayout({x, y, width, height, pageX, pageY});
    },
    [setLayout]
  );
  const onLayout = React.useCallback(() => {
    ref.current.measure(onMeasureLayout);
  }, [ref, onMeasureLayout]); /* hack */
  const onTerminalMoved = React.useCallback((
    terminalId: string,
    wire: Wire,
    wireDirection: WireDirection,
    point: Point,
  ): void => {
    setWireBuffer((currentWireBuffer: WireBuffer) => {
      const pointsBuffer = (currentWireBuffer[wire.wireId] || {}) as PointsBuffer;
      const nextPoint = {wireDirection, point};
      const {renderWire} = wire;
      const nextPointsBuffer = {
        ...pointsBuffer,
        [terminalId]: nextPoint,
        renderWire,
      } as PointsBuffer;
      return {
        ...currentWireBuffer,
        [wire.wireId]: nextPointsBuffer,
      };
    });
  }, [setWireBuffer]);
  const onTerminalsDestroyed = React.useCallback((terminalIds: readonly string[]) => {
    setWireBuffer((currentWireBuffer: WireBuffer) => {
      return Object.fromEntries(
        Object.entries(currentWireBuffer).filter(([k]) => terminalIds.indexOf(k) < 0),
      );
    });
  }, [setWireBuffer]);
  const value = React.useMemo(
    () => ({
      ...defaultValue,
      onTerminalMoved,
      sensitivityList,
      onTerminalsDestroyed,
    }),
    [defaultValue, onTerminalMoved, sensitivityList, onTerminalsDestroyed]
  );
  return (
    <CircuitContext.Provider value={value}>
      <View style={style}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout} ref={ref}>
          {!!layout && (
            <AnimatedSvg
              style={StyleSheet.absoluteFill}
              width={layout.width}
              height={layout.height}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
            >
              {Object.values(wireBuffer).map(
                ({renderWire, ...extras}, i) => (
                  <React.Fragment key={`k${i}`}>
                    {renderWire(Object.values(extras).map(
                      ({point, ...extras}) => ({
                        ...extras,
                        point: [point[0] - layout.pageX, point[1] - layout.pageY],
                      }),
                    ))}
                  </React.Fragment>
                )
              )}
            </AnimatedSvg>
          )}
        </View>
        {children}
      </View>
    </CircuitContext.Provider>
  );
}

export default React.memo(CircuitProvider);