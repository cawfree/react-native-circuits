import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Svg from 'react-native-svg';

import {AggregateLayout, FitSvgProps} from '../types';

export default function FitSvg({
  style,
  children,
  render,
 }: FitSvgProps): JSX.Element {
  const ref = React.useRef<View>();
  const [layout, setLayout] = React.useState<AggregateLayout>();
  const onMeasureLayout = React.useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => {
      setLayout({ x, y, width, height, pageX, pageY });
    },
    [setLayout]
  );
  const onLayout = React.useCallback(() => {
    ref.current?.measure(onMeasureLayout);
  }, [ref, onMeasureLayout]); /* hack */
  return (
    <View style={StyleSheet.flatten(style as ViewStyle)}>
      {/* @ts-ignore */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout} ref={ref}>
        {!!layout && (
          <Svg
            style={StyleSheet.absoluteFill}
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
          >
            {!!render && render(layout)}
          </Svg>
        )}
      </View>
      {children}
    </View>
  );
}