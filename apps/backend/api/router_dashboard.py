"""
router_dashboard.py - Dashboard endpoint

GET /api/dashboard
"""

from fastapi import APIRouter

from data.goal_store import list_goals
from memory.history import ConversationHistory

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    ConversationHistory.ensure_session("s001", seed_welcome=True)
    history = ConversationHistory("s001")
    messages = history.get_all_messages()

    goal_cards = []
    for goal in list_goals():
        target = float(goal.get("target_amount", 0))
        current = float(goal.get("current_saved", 0))
        pct = int(min(100, (current / target * 100) if target > 0 else 0))
        status = goal.get("status") or ("on_track" if pct >= 60 else "at_risk")

        goal_cards.append({
            "goal_id": goal["goal_id"],
            "goal_name": goal.get("goal_name", "Goal"),
            "target_amount": target,
            "target_date": goal.get("target_date", "2026-12-01"),
            "current_saved": current,
            "progress_percent": pct,
            "status": status,
        })

    active_goal_id = goal_cards[0]["goal_id"] if goal_cards else "g001"
    last_message = messages[-1]["content"] if messages else "How can I help with your financial goals today?"

    return {
        "success": True,
        "data": {
            "goals": goal_cards,
            "active_goal_id": active_goal_id,
            "chat_preview": {
                "session_id": "s001",
                "last_message": last_message,
                "unread_count": 0,
            },
            "input_actions": [
                {"type": "manual_input", "label": "Enter Data"},
                {"type": "ocr_upload", "label": "Scan Receipt"},
            ],
        },
    }
