import * as React from 'react';
import {View} from 'react-native';

import type {ActiveComponentProps} from '../types';

export default function ActiveComponent({
  style,
  children,
  onMeasureBounds,
}: ActiveComponentProps): JSX.Element {
  const ref = React.useRef<View>();
  const onLayout = React.useCallback(() => {
    ref.current?.measure(onMeasureBounds);
  }, [ref]);
  React.useEffect(() => {
    onLayout();
  }, [style, children, onLayout]);
  return (
    <>
      {/* @ts-ignore */}
      <View ref={ref} style={style} onLayout={onLayout}>
        {children}
      </View>
    </>
  );
}
