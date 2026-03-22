import uuid


DEFAULT_GOALS: list[dict] = [
    {
        "goal_id": "g001",
        "goal_name": "High Priority Retirement",
        "goal_type": "saving",
        "target_amount": 1_000_000.0,
        "target_date": "2026-12-01",
        "currency": "VND",
        "created_from": "seed",
        "current_saved": 50_000.0,
        "status": "at_risk",
    },
    {
        "goal_id": "g002",
        "goal_name": "Vacation 2024",
        "goal_type": "purchase",
        "target_amount": 3_000.0,
        "target_date": "2026-12-01",
        "currency": "VND",
        "created_from": "seed",
        "current_saved": 500.0,
        "status": "at_risk",
    },
]

_goals_store: dict[str, dict] = {goal["goal_id"]: dict(goal) for goal in DEFAULT_GOALS}


def list_goals() -> list[dict]:
    return [dict(goal) for goal in _goals_store.values()]


def get_goal(goal_id: str) -> dict | None:
    goal = _goals_store.get(goal_id)
    return dict(goal) if goal else None


def create_goal(
    goal_name: str,
    goal_type: str,
    target_amount: float,
    target_date: str,
    currency: str = "VND",
    created_from: str | None = None,
) -> dict:
    goal_id = f"g_{uuid.uuid4().hex[:8]}"
    goal = {
        "goal_id": goal_id,
        "goal_name": goal_name,
        "goal_type": goal_type,
        "target_amount": float(target_amount),
        "target_date": target_date,
        "currency": currency,
        "created_from": created_from,
        "current_saved": 0.0,
        "status": "on_track",
    }
    _goals_store[goal_id] = goal
    return dict(goal)


def get_goal_ids() -> list[str]:
    return list(_goals_store.keys())
