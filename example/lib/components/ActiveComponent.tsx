import * as React from 'react';
import {View} from 'react-native';

import type {ActiveComponentProps} from '../types';

function ActiveComponent({
  style,
  children,
  onMeasureBounds,
}: ActiveComponentProps): JSX.Element {
  const ref = React.useRef(null);
  const onLayout = React.useCallback(() => {
    ref.current.measure(onMeasureBounds);
  }, []);
  return (
    <View ref={ref} style={style} onLayout={onLayout}>
      {children}
    </View>
  );
}

export default React.memo(ActiveComponent);
