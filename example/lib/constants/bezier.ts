import type { Point } from "../types";

// https://stackoverflow.com/a/45245042/1701465 💖
export default function bezier(start: Point, end: Point): string {
  const [startX, startY] = start;
  const [endX, endY] = end;

  const AX = startX;
  const AY = startY;

  const BX = Math.abs(endX - startX) * 0.05 + startX;
  const BY = startY;

  const CX = startX + Math.abs(endX - startX) * 0.33;
  const CY = startY;
  const DX = endX - Math.abs(endX - startX) * 0.33;
  const DY = endY;
  const EX = -Math.abs(endX - startX) * 0.05 + endX;
  const EY = endY;

  const FX = endX;
  const FY = endY;

  return `M${AX},${AY}L${BX},${BY} C${CX},${CY} ${DX},${DY} ${EX},${EY} L${FX},${FY}`;
}
