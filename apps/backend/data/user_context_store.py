from copy import deepcopy
from datetime import datetime, timedelta


def _days_ago_string(days: int) -> str:
    return (datetime.today() - timedelta(days=days)).strftime("%Y-%m-%d")


DEFAULT_USER_CONTEXT: dict = {
    "balance": 5_000.0,
    "monthly_income": 9_000.0,
    "monthly_spending": 4_500.0,
    "projected_savings": 2_000.0,
    "recent_transactions": [
        {"date": _days_ago_string(4), "amount": 150.0, "category": "Dining", "description": "Lunch"},
        {"date": _days_ago_string(3), "amount": 2_500.0, "category": "Rent", "description": "Rent"},
        {"date": _days_ago_string(2), "amount": 300.0, "category": "Groceries", "description": "Groceries"},
        {"date": _days_ago_string(1), "amount": 3_000.0, "category": "Salary", "description": "Salary"},
    ],
}

_user_context: dict = deepcopy(DEFAULT_USER_CONTEXT)


def get_user_context() -> dict:
    return deepcopy(_user_context)


def _today_string() -> str:
    return datetime.today().strftime("%Y-%m-%d")


def _normalize_entry_amount(value: float | int | None) -> float:
    if value is None:
        return 0.0
    return float(value)


def apply_manual_input(payload: dict) -> int:
    imported_count = 0

    monthly_income = payload.get("monthly_income")
    current_balance = payload.get("current_balance")
    projected_savings = payload.get("projected_savings")

    if monthly_income is not None:
        _user_context["monthly_income"] = _normalize_entry_amount(monthly_income)
        imported_count += 1

    if current_balance is not None:
        _user_context["balance"] = _normalize_entry_amount(current_balance)
        imported_count += 1

    if projected_savings is not None:
        _user_context["projected_savings"] = _normalize_entry_amount(projected_savings)
        imported_count += 1

    entry_type = payload.get("entry_type")
    amount = payload.get("amount")
    if entry_type in {"income", "expense"} and amount is not None:
        tx_amount = _normalize_entry_amount(amount)
        if entry_type == "income":
            _user_context["balance"] += tx_amount
            _user_context["monthly_income"] += tx_amount
            category = "Salary"
        else:
            _user_context["balance"] = max(0.0, _user_context["balance"] - tx_amount)
            _user_context["monthly_spending"] += tx_amount
            category = "Shopping"

        _user_context["recent_transactions"].append({
            "date": _today_string(),
            "amount": tx_amount,
            "category": category,
            "description": "Manual entry",
        })
        imported_count += 1

    categories = payload.get("categories", [])
    if categories:
        imported_count += len(categories)

    return imported_count


def apply_transactions(transactions: list[dict]) -> int:
    valid_transactions = []
    for tx in transactions:
        if tx.get("date") and tx.get("amount") is not None:
            valid_transactions.append({
                "date": tx["date"],
                "amount": float(tx["amount"]),
                "category": tx.get("category", "Imported"),
                "description": tx.get("description", "Imported transaction"),
            })

    _user_context["recent_transactions"].extend(valid_transactions)

    for tx in valid_transactions:
        category = str(tx.get("category", "")).lower()
        amount = float(tx["amount"])
        if category in ("salary", "income", "bonus", "refund"):
            _user_context["monthly_income"] += amount
            _user_context["balance"] += amount
        else:
            _user_context["monthly_spending"] += amount
            _user_context["balance"] = max(0.0, _user_context["balance"] - amount)

    return len(valid_transactions)
