// ============================================================
// inputDataCoordinator.ts
// POST /api/input-data
// ============================================================

import type { InputDataRequest, InputDataResponse } from './types';
import { fetchJson } from './apiClient';

export async function postInputData(payload: InputDataRequest): Promise<InputDataResponse> {
  return fetchJson<InputDataResponse>('/api/input-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------------------------
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
