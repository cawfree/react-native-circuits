import type {NodePoint} from '../types';

// https://stackoverflow.com/a/16282685/1701465
export default function findCenterPoint(points: readonly NodePoint[]): NodePoint {
  let minX: number;
  let minY: number;
  let maxX: number;
  let maxY: number;
  for (var i = 0; i < points.length; i++) {
    minX = points[i][0] < minX || minX == null ? points[i][0] : minX;
    maxX = points[i][0] > maxX || maxX == null ? points[i][0] : maxX;
    minY = points[i][1] < minY || minY == null ? points[i][1] : minY;
    maxY = points[i][1] > maxY || maxY == null ? points[i][1] : maxY;
  }
  return [(minX + maxX) * 0.5, (minY + maxY) * 0.5];
};
