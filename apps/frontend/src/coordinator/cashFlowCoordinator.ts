// ============================================================
// cashFlowCoordinator.ts
// GET /api/cashflow/weekly
// ============================================================

import type { CashFlowResponse } from './types';
import { fetchJson } from './apiClient';

export async function getCashFlow(goalId?: string): Promise<CashFlowResponse> {
  const path = '/api/cashflow/weekly' + (goalId ? `?goal_id=${goalId}` : '');
  return fetchJson<CashFlowResponse>(path);
}

// ---------------------------------------------------------------------------
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
