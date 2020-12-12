import * as React from 'react';
import {View} from 'react-native';

import type {ActiveComponentProps} from '../types';

export default function ActiveComponent({
  style,
  children,
  onMeasureBounds,
}: ActiveComponentProps): JSX.Element {
  const ref = React.useRef(null);
  const onLayout = React.useCallback(() => {
    ref.current.measure(onMeasureBounds);
  }, []);
  React.useEffect(() => {
    onLayout();
  }, [style, children, onLayout]);
  return (
    <View ref={ref} style={style} onLayout={onLayout}>
      {children}
    </View>
  );
}
