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
        return {
            "balance": 5000.00,
            "monthly_spending": 4500.00,
            "recent_transactions": [
                {"date": "2023-10-01", "amount": 150.00, "category": "Dining"},
                {"date": "2023-10-05", "amount": 2500.00, "category": "Rent"},
                {"date": "2023-10-12", "amount": 300.00, "category": "Groceries"}
            ],
            "goals": [
                {"name": "High Priority Retirement", "target_amount": 1000000, "current_amount": 50000},
                {"name": "Vacation 2024", "target_amount": 3000, "current_amount": 500}
            ]
        }
