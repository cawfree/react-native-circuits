import type {StrokeProps} from 'react-native-svg';

export default function parseStrokeWidth(strokeProps: StrokeProps): number {
  const {strokeWidth: maybeStrokeWidth} = strokeProps;
  return Number.parseFloat(`${maybeStrokeWidth}`);
}
