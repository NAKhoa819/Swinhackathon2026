// ============================================================
// goalCoordinator.ts
// GET /api/goals/{goal_id}/progress
// POST /api/goals
// ============================================================

import type {
  GoalProgressResponse,
  CreateGoalRequest,
  CreateGoalResponse,
} from './types';
import { fetchJson } from './apiClient';

export async function getGoalProgress(goalId: string): Promise<GoalProgressResponse> {
  return fetchJson<GoalProgressResponse>(`/api/goals/${goalId}/progress`);
}

/**
 * Tạo goal mới.
 */
export async function createGoal(payload: CreateGoalRequest): Promise<CreateGoalResponse> {
  return fetchJson<CreateGoalResponse>('/api/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------------------------
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
