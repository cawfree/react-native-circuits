import type {Node, NodePoint} from '../types';

export default function NodesToPoints(nodes: readonly Node[]): readonly NodePoint[] {
  return nodes.map(
    ({
      layout: {
        nativeEvent: { layout },
      },
    }) =>
      [
        layout.x + layout.width * 0.5,
        layout.y + layout.height * 0.5,
      ] as NodePoint
  );
}
