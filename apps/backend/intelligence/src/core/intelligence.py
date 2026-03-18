def calculate_sustainability_index(user_context: dict, market_context: dict) -> float:
    """
    Calculates the Sustainability Index (S_i) based on user and market contexts.
    
    This is a simplified dummy calculation for the sake of the framework:
    S_i = (Balance / (Monthly Spending * (1 + Inflation))) * Goal Factor
    
    Returns a float between 0.0 and 1.0 (clamped).
    """
    try:
        balance = user_context.get("balance", 0)
        spending = user_context.get("monthly_spending", 1) # Avoid div by zero
        goals = user_context.get("goals", [])
        
        inflation = market_context.get("inflation_rate", 0.0)
        
        # Simple goal factor: higher goals require more sustainability
        goal_factor = 1.0
        if "High Priority Retirement" in [g.get("name") for g in goals]:
            goal_factor = 0.9 # Harder to sustain
            
        # Simplified formula
        raw_si = (balance / max(spending * (1 + inflation), 1)) * goal_factor * 0.1
        
        # Clamp between 0.0 and 1.0
        s_i = max(0.0, min(1.0, raw_si))
        return s_i
    except Exception as e:
        print(f"Error calculating S_i: {e}")
        return 0.5 # Default middle-ground

def determine_strategy(s_i: float) -> str:
    """
    Determines the strategy to trigger based on the Decision Tree logic constraints:
    - If S_i < 0.5 -> Strategy B (Goal Re-alignment)
    - If 0.5 <= S_i < 0.8 -> Strategy A (Cost Optimization)
    - If S_i >= 0.8 -> None (Sustainable)
    """
    if s_i < 0.5:
        return "B"
    elif s_i < 0.8:
        return "A"
    else:
        return "None"
