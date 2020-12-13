import * as React from 'react';
import {View, Animated, StyleSheet, ViewStyle, Platform} from 'react-native';
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
  onLayout: onLayoutCallback,
  extraPadding: maybeExtraPadding,
 }: FitSvgProps): JSX.Element {
  const opacity = React.useMemo(() => new Animated.Value(0), []);
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
  const onLayout = React.useCallback((e) => {
    ref.current?.measure(onMeasureLayout);
    // TODO: Make aggregate
    !!onLayoutCallback && onLayoutCallback(e);
  }, [ref, onMeasureLayout]); /* hack */
  const extraPadding = maybeExtraPadding || 0;
  React.useEffect(() => {
    !!layout && requestAnimationFrame(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    });
  }, [opacity, layout]);
  return (
    <Animated.View style={[{opacity}, style]}>
      {/* @ts-ignore */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout} ref={ref}>
        {!!layout && (
          <Svg
            style={[
              styles.absolute,
              {
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
    </Animated.View>
  );
}
