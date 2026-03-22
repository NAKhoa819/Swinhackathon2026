class ContextRetriever:
    def __init__(self, db_connection=None):
        # Dummy DB connection for now
        self.db = db_connection

    def fetch_user_financial_context(self, user_id: str) -> dict:
        """
        Retrieves 'Goal' and 'Transaction' records and formats them into a dictionary.
        In reality, this would query a database. For now, it returns dummy data.
        """
        
        # Dummy mock data for context
        {
    "user_id": "QA-2026-VNU",
    "balance": 12500.00,
    "monthly_spending": 3200.00,
    "monthly_income": 5500.00,
    "recent_transactions": [
        {"date": "2026-03-01", "amount": 1800.00, "category": "Housing", "note": "Monthly Rent"},
        {"date": "2026-03-03", "amount": 65.50, "category": "Utilities", "note": "Electricity/Water"},
        {"date": "2026-03-05", "amount": 120.00, "category": "Groceries", "note": "Weekly Restock"},
        {"date": "2026-03-08", "amount": 45.00, "category": "Transport", "note": "Fuel/Commute"},
        {"date": "2026-03-10", "amount": 210.00, "category": "Entertainment", "note": "Concert Tickets"},
        {"date": "2026-03-12", "amount": 35.00, "category": "Dining", "note": "Lunch with Team"},
        {"code": "2026-03-15", "amount": 85.00, "category": "Subscription", "note": "Cloud Services/SaaS"},
        {"date": "2026-03-18", "amount": 150.00, "category": "Health", "note": "Gym Membership/Supplements"}
    ],
    "goals": [
        {
            "name": "Emergency Fund", 
            "target_amount": 15000, 
            "current_amount": 10000, 
            "priority": "High"
        },
        {
            "name": "Nvidia RTX 5090 Upgrade", 
            "target_amount": 2500, 
            "current_amount": 1200, 
            "priority": "Medium"
        },
        {
            "name": "Masters Degree Fund", 
            "target_amount": 40000, 
            "current_amount": 5000, 
            "priority": "Low"
        }
    ]
}
