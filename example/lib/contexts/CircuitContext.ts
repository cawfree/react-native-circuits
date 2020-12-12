import * as React from "react";

import type {CircuitContextValue, Point, Wire} from "../types";
import {WireDirection} from "../types/enums";

const defaultValue = Object.freeze({
  onTerminalMoved: (
    terminalId: string,
    wire: Wire,
    wireDirection: WireDirection,
    point: Point,
  ): void => {
    throw new Error(
      "It looks like you've forgotten to wrap your <Module /> in a <Circuit />."
    );
  },
  sensitivityList: [],
  onTerminalsDestroyed: () => {
    throw new Error(
      "It looks like you've forgotten to wrap your <Module /> in a <Circuit />."
    );
  },
}) as CircuitContextValue;

export default React.createContext(defaultValue);
