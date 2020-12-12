import * as React from 'react';
import {Animated} from 'react-native';

import type {ActiveComponentProps} from '../types';

function ActiveComponent({
  style,
  children,
  sensitivityList,
  onMeasureBounds,
}: ActiveComponentProps): JSX.Element {
  const ref = React.useRef(null);
  const onLayout = React.useCallback(() => null, []); /* hack */
  const onAnimationChange = React.useCallback(() => {
    ref.current.measure(onMeasureBounds);
  }, [ref, onMeasureBounds]);
  React.useEffect(() => {
    const listeners = sensitivityList.map((animatedValue) =>
      animatedValue.addListener(onAnimationChange)
    );
    return () => sensitivityList.map((e, i) => e.removeListener(listeners[i]));
  }, [sensitivityList, onAnimationChange]);
  return (
    <Animated.View ref={ref} style={style} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
}

export default React.memo(ActiveComponent);
