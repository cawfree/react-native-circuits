import type {StrokeProps} from 'react-native-svg';

export default function parseStrokeColor(strokeProps: StrokeProps): string {
  const {stroke: maybeStroke} = strokeProps;
  if (typeof maybeStroke === 'string') {
    return maybeStroke;
  }
  return '#000000';
}
