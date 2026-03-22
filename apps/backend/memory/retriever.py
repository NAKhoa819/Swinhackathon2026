from data.user_context_store import get_user_context


class ContextRetriever:
    def __init__(self, db_connection=None):
        # Dummy DB connection for now
        self.db = db_connection

    def fetch_user_financial_context(self, user_id: str) -> dict:
        """
        Retrieves 'Goal' and 'Transaction' records and formats them into a dictionary.
        In reality, this would query a database. For now, it returns dummy data.
        """
        return get_user_context()
