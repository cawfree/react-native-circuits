import * as React from 'react';
import {nanoid} from 'nanoid/non-secure';

import type {Wire, useRenderBezierResult} from '../types';

export default function useWire({renderWire, pathProps}: useRenderBezierResult): Wire {
  const wireId = React.useMemo(nanoid, []);
  return React.useMemo(() => ({ wireId, renderWire, pathProps }), [
    renderWire,
    pathProps,
  ]);
}
