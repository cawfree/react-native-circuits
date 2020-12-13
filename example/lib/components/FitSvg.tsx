import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Svg, {G} from 'react-native-svg';

import {AggregateLayout, FitSvgProps} from '../types';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

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
  const extraPadding = 10;
  return (
    <View style={StyleSheet.flatten(style as ViewStyle)}>
      {/* @ts-ignore */}
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        onLayout={onLayout}
        ref={ref}>
        {!!layout && (
          <Svg
            style={[
              styles.absolute,
              {
                borderWidth: 1,
                top: -1 * extraPadding, 
                left: -1 * extraPadding, 
              },
            ]}
            width={layout.width + 2 * extraPadding}
            height={layout.height + 2 * extraPadding}
            viewBox={`0 0 ${layout.width + 2 * extraPadding} ${layout.height + 2 * extraPadding}`}
          >
            <G translate={`${extraPadding}, ${extraPadding}`}>
              {!!render && render(layout)}
            </G>
          </Svg>
        )}
      </View>
      {children}
    </View>
  );
}