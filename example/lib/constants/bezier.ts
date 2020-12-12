import type { Point } from "../types";

// https://stackoverflow.com/a/45245042/1701465
export default function bezier(start: Point, end: Point): string {
  const [startX, startY] = start;
  const [endX, endY] = end;

  // M
  var AX = startX;
  var AY = startY;

  // L
  var BX = Math.abs(endX - startX) * 0.05 + startX;
  var BY = startY;

  // C
  var CX = startX + Math.abs(endX - startX) * 0.33;
  var CY = startY;
  var DX = endX - Math.abs(endX - startX) * 0.33;
  var DY = endY;
  var EX = -Math.abs(endX - startX) * 0.05 + endX;
  var EY = endY;

  // L
  var FX = endX;
  var FY = endY;

  // setting up the path string
  var path = "M" + AX + "," + AY;
  path += " L" + BX + "," + BY;
  path += " " + "C" + CX + "," + CY;
  path += " " + DX + "," + DY;
  path += " " + EX + "," + EY;
  path += " L" + FX + "," + FY;

  return path;
}
