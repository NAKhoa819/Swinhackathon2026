// ============================================================
// dashboardCoordinator.ts
// GET /api/dashboard
// ============================================================

import type { DashboardResponse } from './types';
import { fetchJson } from './apiClient';
import { postInputData } from './inputDataCoordinator';

export async function getDashboard(): Promise<DashboardResponse> {
  return fetchJson<DashboardResponse>('/api/dashboard');
}

// ---------------------------------------------------------------------------
export async function submitManualEntry(type: 'income' | 'expense', amount: number): Promise<{ success: boolean }> {
  return postInputData({
    source: 'manual',
    payload: {
      entry_type: type,
      amount,
    },
  });
}

export async function uploadReceipt(sourceType: 'camera' | 'gallery'): Promise<{ success: boolean }> {
  await delay(500);
  console.log(`[dashboardCoordinator] uploadReceipt from: ${sourceType}`);
  return { success: true };
}

// ---------------------------------------------------------------------------
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
